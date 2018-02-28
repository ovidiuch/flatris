// @flow

import { func } from 'prop-types';
import { uniqWith } from 'lodash';
import { Component } from 'react';
import { connect } from 'react-redux';
import { getGame } from '../../utils/api';
import { getSocket } from '../../utils/socket';
import { startBackfill, cancelBackfill } from '../../utils/backfill';
import { isValidGameAction } from '../../reducers/game';
import { addGame, removeGame } from '../../actions/global';

import type { Node } from 'react';
import type { Dispatch } from 'redux'; // eslint-disable-line import/named
import type { GameId, State } from '../../types/state';
import type { Action, GameAction } from '../../types/actions';
import type { RoomId, BackfillResponse } from '../../types/api';

const {
  subscribe,
  onGameAction,
  offGameAction,
  onGameRemoved,
  offGameRemoved,
  broadcastAction
} = getSocket();

type Props = {
  children: Node,
  state: State,
  dispatch: Dispatch<Action>
};

type LocalState = {
  backfillId: ?number,
  pendingActions: Array<GameAction>
};

class SocketProviderInner extends Component<Props, LocalState> {
  static childContextTypes = {
    subscribe: func.isRequired,
    broadcastGameAction: func.isRequired
  };

  state = {
    backfillId: null,
    pendingActions: []
  };

  getChildContext() {
    return {
      subscribe: this.handleSubscribe,
      broadcastGameAction: this.handleBroadcastGameAction
    };
  }

  componentDidMount() {
    onGameAction(this.handleGameAction);
    onGameRemoved(this.handleGameRemoved);
  }

  componentWillUnmount() {
    const { backfillId } = this.state;

    offGameAction(this.handleGameAction);
    offGameRemoved(this.handleGameRemoved);

    if (backfillId) {
      cancelBackfill(backfillId);
    }
  }

  handleGameAction = (action: GameAction) => {
    // console.log('[SOCKET] On game-action', action);

    const { state, dispatch } = this.props;
    const { backfillId, pendingActions } = this.state;

    if (backfillId) {
      this.setState({
        pendingActions: [...pendingActions, action]
      });
    } else {
      if (action.type === 'JOIN_GAME') {
        // There's no previous player action to follow when user just joined
        dispatch(action);
      } else {
        const { gameId } = action.payload;
        const game = state.games[gameId];

        if (!game) {
          this.loadGame(gameId);
        } else if (isValidGameAction(game, action)) {
          dispatch(action);
        } else {
          // The action will be discarded for now, but it will show up again
          // during backfill
          this.startBackfill(gameId);
        }
      }
    }
  };

  handleGameRemoved = (gameId: GameId) => {
    console.log(`Received server notice of removed game ${gameId}`);

    const { dispatch } = this.props;
    dispatch(removeGame(gameId));
  };

  handleSubscribe = (roomId: RoomId) => {
    subscribe(roomId);

    if (roomId !== 'global') {
      this.startBackfill(roomId);
    }
  };

  async loadGame(gameId: GameId) {
    console.log(`Detected new game ${gameId}...`);

    const { dispatch } = this.props;
    const game = await getGame(gameId);
    dispatch(addGame(game));
  }

  startBackfill(gameId: GameId) {
    console.log(`Backfilling ${gameId}...`);

    const { games } = this.props.state;
    const backfillId = startBackfill(
      games[gameId],
      this.handleBackfillComplete,
      this.handleBackfillError
    );

    this.setState({
      backfillId,
      pendingActions: []
    });
  }

  handleBackfillComplete = (res: BackfillResponse) => {
    const { dispatch } = this.props;
    const { pendingActions } = this.state;

    const mergedActions = [...res, ...pendingActions];
    const uniqActions = uniqWith(mergedActions, compareGameActions);

    this.setState({
      backfillId: null,
      pendingActions: []
    });

    // TODO: Determine if actions are compatible with game state, and if not
    // remove game from state completely
    // TODO: Dispatch events at an interval, to convey the rhythm in
    // which the actions were originally performed
    uniqActions.forEach(dispatch);

    const numDupes = mergedActions.length - uniqActions.length;
    console.log(
      `Backfilled ${uniqActions.length} actions (${numDupes} dupes).`
    );
  };

  handleBackfillError = (gameId: GameId) => {
    console.warn(`Backfill failed, removing game ${gameId} from state`);

    const { dispatch } = this.props;
    dispatch(removeGame(gameId));
  };

  handleBroadcastGameAction = (action: GameAction) => {
    const { dispatch } = this.props;
    const { backfillId } = this.state;

    // Disallow user to mutate state until it's up to date with server
    if (backfillId !== null) {
      console.warn('Action broadcast denied while backfilling.');
      return;
    }

    // The final action is returned from async thunk actions
    const resAction: Action = dispatch(action);
    broadcastAction(resAction);

    // Allow callers to chain broadcasted actions
    return resAction;
  };

  render() {
    return this.props.children;
  }
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
