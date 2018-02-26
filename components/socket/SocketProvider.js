// @flow

import { func } from 'prop-types';
import { uniqWith } from 'lodash';
import { Component } from 'react';
import { connect } from 'react-redux';
import io from 'socket.io-client';
import { getApiUrl, backfillGameActions } from '../../utils/api';
import { isValidGameAction } from '../../reducers/game';
import { getCurGame } from '../../reducers/cur-game';

import type { Node } from 'react';
import type { GameId, Game, State } from '../../types/state';
import type {
  Action,
  GameAction,
  ThunkAction,
  BackfillRanges
} from '../../types/actions';

type Props = {
  children: Node,
  state: State,
  dispatch: (Action | ThunkAction) => Action
};

type LocalState = {
  isBackfilling: boolean,
  pendingActions: Array<GameAction>
};

let socket;

function getSocket() {
  if (!socket) {
    socket = io(getApiUrl());
  }

  return socket;
}

class SocketProviderInner extends Component<Props, LocalState> {
  static childContextTypes = {
    openGame: func.isRequired,
    closeGame: func.isRequired,
    broadcastGameAction: func.isRequired
  };

  state = {
    isBackfilling: false,
    pendingActions: []
  };

  componentDidMount() {
    getSocket().on('game-action', this.handleReceiveGameAction);
  }

  getChildContext() {
    return {
      openGame: this.handleOpenGame,
      closeGame: this.handleCloseGame,
      broadcastGameAction: this.handleBroadcastGameAction
    };
  }

  componentWillUnmount() {
    if (socket) {
      socket.off('game-action', this.handleReceiveGameAction);
    }
  }

  handleOpenGame = async (gameId: GameId) => {
    // console.log('[SOCKET] open-game', gameId);
    getSocket().emit('open-game', gameId);

    // Ensure game state is up to date
    await this.backfill();
  };

  handleCloseGame = (gameId: GameId) => {
    // console.log('[SOCKET] close-game', gameId);
    getSocket().emit('close-game', gameId);
  };

  handleReceiveGameAction = (action: GameAction) => {
    // console.log('[SOCKET] On game-action', action);

    const { state, dispatch } = this.props;
    const { isBackfilling, pendingActions } = this.state;

    if (isBackfilling) {
      this.setState({
        pendingActions: [...pendingActions, action]
      });
    } else {
      if (action.type === 'JOIN_GAME') {
        // There's no previous player action to follow when user just joined
        dispatch(action);
      } else {
        // TODO: Extend to work with multiple games in state
        const curGame = getCurGame(state);

        if (isValidGameAction(curGame, action)) {
          dispatch(action);
        } else {
          // The action will be discarded for now, but it will show up again
          // during backfill
          this.backfill();
        }
      }
    }
  };

  async backfill() {
    console.warn('Backfilling...');

    // TODO: Extend to work with multiple games in state
    const curGame = getCurGame(this.props.state);

    this.setState({
      isBackfilling: true,
      pendingActions: []
    });

    const backfillRanges = getBackfillRanges([curGame]);
    const backfillRes = await backfillGameActions(backfillRanges);

    const mergedActions = [
      ...backfillRes[curGame.id],
      ...this.state.pendingActions
    ];
    const uniqActions = uniqWith(mergedActions, compareGameActions);

    this.setState({
      isBackfilling: false,
      pendingActions: []
    });

    // TODO: Dispatch events at an interval, to convey the rhythm in
    // which the actions were originally performed
    uniqActions.forEach(this.props.dispatch);

    const numDupes = mergedActions.length - uniqActions.length;
    console.log(
      `Backfilled ${uniqActions.length} actions (${numDupes} dupes).`
    );
  }

  handleBroadcastGameAction = (action: Action) => {
    const { dispatch } = this.props;
    const { isBackfilling } = this.state;

    // Disallow user to mutate state until it's up to date with server
    if (isBackfilling) {
      console.warn('Action broadcast denied while backfilling.');
      return;
    }

    // The final action is returned from async thunk actions
    const resAction: Action = dispatch(action);

    // console.log('[SOCKET] Emit game-action', resAction);
    getSocket().emit('game-action', resAction);

    // Allow callers to chain broadcasted actions
    return resAction;
  };

  render() {
    return this.props.children;
  }
}

function getBackfillRanges(games: Array<Game>): BackfillRanges {
  return games.map(game => ({
    gameId: game.id,
    players: game.players.map(p => ({
      userId: p.user.id,
      from: p.lastActionId
    }))
  }));
}

function compareGameActions(a1: GameAction, a2: GameAction): boolean {
  return (
    a1.payload.actionId === a2.payload.actionId &&
    a1.payload.userId === a2.payload.userId &&
    a1.payload.gameId === a2.payload.gameId
  );
}

function mapStateToProps(state: State) {
  return { state };
}

// We only need connect to obtain the `dispatch` store method via props
export const SocketProvider = connect(mapStateToProps)(SocketProviderInner);
