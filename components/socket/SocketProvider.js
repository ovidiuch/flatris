// @flow

import { func } from 'prop-types';
import { isEqual, uniqWith } from 'lodash';
import { Component } from 'react';
import { connect } from 'react-redux';
import { getSocket } from '../../utils/socket';
import { startBackfill, cancelBackfill } from '../../utils/backfill';
import { isValidGameAction } from '../../reducers/game';

import type { Node } from 'react';
import type { Dispatch } from 'redux'; // eslint-disable-line import/named
import type { Following, State } from '../../types/state';
import type { GameAction } from '../../types/actions';
import type { BackfillResult } from '../../types/backfill';

const {
  followGames,
  onGameAction,
  offGameAction,
  broadcastAction
} = getSocket();

type Props = {
  children: Node,
  state: State,
  dispatch: Dispatch<GameAction>
};

type LocalState = {
  following: Following,
  backfillId: ?number,
  pendingActions: Array<GameAction>
};

class SocketProviderInner extends Component<Props, LocalState> {
  static childContextTypes = {
    followGames: func.isRequired,
    broadcastGameAction: func.isRequired
  };

  state = {
    following: [],
    backfillId: null,
    pendingActions: []
  };

  componentDidMount() {
    onGameAction(this.handleReceiveGameAction);
  }

  getChildContext() {
    return {
      followGames: this.handleFollowGames,
      broadcastGameAction: this.handleBroadcastGameAction
    };
  }

  componentWillUnmount() {
    const { backfillId } = this.state;

    offGameAction(this.handleReceiveGameAction);

    if (backfillId) {
      cancelBackfill(backfillId);
    }
  }

  handleReceiveGameAction = (action: GameAction) => {
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
          throw new Error('Received action for missing game');
        }

        if (isValidGameAction(game, action)) {
          dispatch(action);
        } else {
          // The action will be discarded for now, but it will show up again
          // during backfill
          this.startBackfill();
        }
      }
    }
  };

  handleFollowGames = following => {
    if (!isEqual(following, this.state.following)) {
      followGames(following);

      // Auto-backfill to ensure states are up to date
      this.setState({ following }, this.startBackfill);
    }
  };

  startBackfill() {
    const { games } = this.props.state;
    const { following } = this.state;

    console.log(`Backfilling ${following.join(', ')}...`);

    const backfillId = startBackfill(
      following.map(id => games[id]),
      this.handleBackfillComplete
    );

    this.setState({
      backfillId,
      pendingActions: []
    });
  }

  handleBackfillComplete = (result: BackfillResult) => {
    const { following, pendingActions } = this.state;

    const backfilledActions = following.reduce(
      (acc, gameId) => [...acc, ...result[gameId]],
      []
    );
    const mergedActions = [...backfilledActions, ...pendingActions];
    const uniqActions = uniqWith(mergedActions, compareGameActions);

    this.setState({
      backfillId: null,
      pendingActions: []
    });

    // TODO: Dispatch events at an interval, to convey the rhythm in
    // which the actions were originally performed
    uniqActions.forEach(this.props.dispatch);

    const numDupes = mergedActions.length - uniqActions.length;
    console.log(
      `Backfilled ${uniqActions.length} actions (${numDupes} dupes).`
    );
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
    const resAction: GameAction = dispatch(action);
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
