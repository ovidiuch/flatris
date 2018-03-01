// @flow

import { object, func } from 'prop-types';
import { uniqWith, sortBy } from 'lodash';
import { Component } from 'react';
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
  children: Node
};

export class SocketProvider extends Component<Props> {
  static contextTypes = {
    // XXX: Instead of using connect like suckers, we pretend WE'RE CONNECT
    // and get direct access to the store.
    // Why? Because we need to check if the state changes right after we
    // dispatch an action (without waiting a render loop), thus identifying
    // "noop" actions and not broacasting them across the network needlessly.
    // Do not try this at home!
    store: object.isRequired
  };

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
    const { getState, dispatch } = this.getStore();
    const { backfill } = getState();

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

    const { getState, dispatch } = this.getStore();
    const state = getState();
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
    const { getState } = this.getStore();
    const { games } = getState();

    if (!games[gameId]) {
      this.loadGame(gameId);
    }
  };

  handleGameRemoved = (gameId: GameId) => {
    console.log('Received server notice of removed game', gameId);

    const { dispatch } = this.getStore();
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

    const { dispatch } = this.getStore();
    const game = await getGame(gameId);
    dispatch(addGame(game));
  }

  startBackfill(gameId: GameId) {
    console.log(`Backfilling ${gameId}...`);

    const { getState, dispatch } = this.getStore();
    const { games } = getState();
    const backfillId = requestBackfill(
      games[gameId],
      this.handleBackfillComplete,
      this.handleBackfillError
    );

    dispatch(startBackfill(backfillId));
  }

  handleBackfillComplete = (res: BackfillResponse) => {
    const { getState, dispatch } = this.getStore();
    const { backfill } = getState();

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

    const { dispatch } = this.getStore();
    dispatch(removeGame(gameId));
  };

  handleBroadcastGameAction = (action: GameAction) => {
    const { getState, dispatch } = this.getStore();
    const { backfill } = getState();

    // Disallow user to mutate state until it's up to date with server
    if (backfill) {
      console.warn('Action broadcast denied while backfilling.');
      return;
    }

    const prevGames = getState().games;

    // The final action is returned from async thunk actions
    // XXX: Don't know how to tell Flow that dispatching regular actions (non
    // redux-thunk) returns the same type of action that was passed in
    // $FlowFixMe
    const resAction: GameAction = dispatch(action);
    const { payload: { gameId } } = resAction;

    // COOL: Don't broacast actions that don't alter the state (ie. MOVE_RIGHT
    // actions when the falling Tetromino is already hitting the right wall)
    if (getState().games[gameId] === prevGames[gameId]) {
      // The following console.log call is only useful for debugging (it floods
      // the console!)
      // console.log(`Not broadcasting noop action ${resAction.type}`);
    } else {
      broadcastAction(resAction);
    }

    // Allow callers to chain broadcasted actions
    return resAction;
  };

  render() {
    return this.props.children;
  }

  getStore(): {
    getState: () => State,
    dispatch: Dispatch
  } {
    return this.context.store;
  }
}

function compareGameActions(a1: GameAction, a2: GameAction): boolean {
  return (
    a1.payload.actionId === a2.payload.actionId &&
    a1.payload.userId === a2.payload.userId &&
    a1.payload.gameId === a2.payload.gameId
  );
}
