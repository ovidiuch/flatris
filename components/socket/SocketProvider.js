// @flow

import { func } from 'prop-types';
import { uniqWith, sortBy } from 'lodash';
import { Component } from 'react';
import { connect } from 'react-redux';
import { getGame } from '../../utils/api';
import { getSocket } from '../../utils/socket';
import { requestBackfill, cancelBackfill } from '../../utils/backfill';
import { getGameActionOffset } from '../../reducers/game';
import {
  addGame,
  removeGame,
  startBackfill,
  endBackfill,
  queueGameAction
} from '../../actions/global';

import type { Node } from 'react';
import type { GameId, State } from '../../types/state';
import type { Action, GameAction, Dispatch } from '../../types/actions';
import type { RoomId, BackfillResponse } from '../../types/api';

const {
  subscribe,
  keepGameAlive,
  onGameAction,
  offGameAction,
  onGameKeepAlive,
  offGameKeepAlive,
  onGameRemoved,
  offGameRemoved,
  broadcastAction
} = getSocket();

type Props = {
  children: Node,
  state: State,
  dispatch: Dispatch
};

class SocketProviderInner extends Component<Props> {
  static childContextTypes = {
    subscribe: func.isRequired,
    keepGameAlive: func.isRequired,
    broadcastGameAction: func.isRequired,
    onGameKeepAlive: func.isRequired,
    offGameKeepAlive: func.isRequired
  };

  getChildContext() {
    return {
      subscribe: this.handleSubscribe,
      keepGameAlive: keepGameAlive,
      broadcastGameAction: this.handleBroadcastGameAction,
      onGameKeepAlive: onGameKeepAlive,
      offGameKeepAlive: offGameKeepAlive
    };
  }

  componentDidMount() {
    onGameAction(this.handleGameAction);
    onGameKeepAlive(this.handleGameKeepAlive);
    onGameRemoved(this.handleGameRemoved);
  }

  componentWillUnmount() {
    const { state, dispatch } = this.props;
    const { backfill } = state;

    offGameAction(this.handleGameAction);
    offGameKeepAlive(this.handleGameKeepAlive);
    offGameRemoved(this.handleGameRemoved);

    if (backfill) {
      cancelBackfill(backfill.backfillId);
      dispatch(endBackfill());
    }
  }

  handleGameAction = (action: GameAction) => {
    // console.log('[SOCKET] On game-action', action);

    const { state, dispatch } = this.props;
    const { backfill } = state;

    if (backfill) {
      dispatch(queueGameAction(action));
    } else {
      const { actionId, gameId } = action.payload;
      const game = state.games[gameId];

      if (!game) {
        this.loadGame(gameId);
      } else {
        const offset = getGameActionOffset(game, action);

        if (offset > 0) {
          // The action will be discarded for now, but it will show up again
          // during backfill
          console.log(`Requesting backfill due to detached action ${actionId}`);
          this.startBackfill(gameId);
        } else if (offset < 0) {
          // Sometimes we get receive some delayed actions via websocket that
          // were already returned by latest backfill
          console.log(`Discarding past game action ${actionId}`);
        } else {
          dispatch(action);
        }
      }
    }
  };

  handleGameKeepAlive = (gameId: GameId) => {
    const { games } = this.props.state;

    if (!games[gameId]) {
      this.loadGame(gameId);
    }
  };

  handleGameRemoved = (gameId: GameId) => {
    console.log('Received server notice of removed game', gameId);

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
    const backfillId = requestBackfill(
      games[gameId],
      this.handleBackfillComplete,
      this.handleBackfillError
    );

    this.props.dispatch(startBackfill(backfillId));
  }

  handleBackfillComplete = (res: BackfillResponse) => {
    const { state, dispatch } = this.props;
    const { backfill } = state;

    if (!backfill) {
      throw new Error(`Backfill is missing in state upon completion`);
    }

    const { queuedActions } = backfill;
    const mergedActions = [...res, ...queuedActions];
    const uniqActions = uniqWith(mergedActions, compareGameActions);
    const sortedActions = sortBy(uniqActions, act => act.payload.actionId);

    // TODO: Dispatch events at an interval, to convey the rhythm in
    // which the actions were originally performed
    sortedActions.forEach(dispatch);

    const numDupes = mergedActions.length - uniqActions.length;
    console.log(
      `Backfilled ${uniqActions.length} actions (${numDupes} dupes).`
    );

    dispatch(endBackfill());
  };

  handleBackfillError = (gameId: GameId) => {
    console.warn(`Backfill failed, removing game ${gameId} from state`);

    const { dispatch } = this.props;
    dispatch(removeGame(gameId));
  };

  handleBroadcastGameAction = (action: GameAction) => {
    const { state, dispatch } = this.props;
    const { backfill } = state;

    // Disallow user to mutate state until it's up to date with server
    if (backfill) {
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
