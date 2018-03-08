// @flow

import { object, func } from 'prop-types';
import { uniqWith, sortBy, findLast, omit } from 'lodash';
import { Component } from 'react';
import { getGame } from '../../utils/api';
import { getSocket } from '../../utils/socket';
import { logError } from '../../utils/rollbar-client';
import { requestBackfill } from '../../utils/backfill';
import { getPlayer, getGameActionOffset } from '../../reducers/game';
import {
  addGame,
  removeGame,
  startBackfill,
  endBackfill,
  queueGameAction
} from '../../actions/global';

import type { Node } from 'react';
import type { GameId, Game, BackfillId, State } from '../../types/state';
import type {
  JoinGameAction,
  GameAction,
  ThunkAction,
  Dispatch
} from '../../types/actions';
import type { RoomId } from '../../types/api';
import type { OnBackfillCompleteArgs } from '../../utils/backfill';

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
    // XXX: Instead of using connect like SUCKERS, we pretend we *are* connect
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

  pendingBackfills: { [gameId: GameId]: BackfillId } = {};

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
    const { dispatch } = this.getStore();

    offGameAction(this.handleGameAction);
    offGameKeepAlive(this.handleGameKeepAlive);
    offGameRemoved(this.handleGameRemoved);

    Object.keys(this.pendingBackfills).forEach(gameId => {
      dispatch(endBackfill(this.pendingBackfills[gameId]));
    });

    // All future backfill callbacks will be ignored
    this.pendingBackfills = {};
  }

  handleGameAction = (action: GameAction) => {
    // console.log('[SOCKET] On game-action', action);

    const { getState, dispatch } = this.getStore();
    const state = getState();
    const { backfills } = state;
    const { actionId, gameId } = action.payload;

    if (backfills[gameId]) {
      dispatch(queueGameAction(action));
    } else {
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
      this.handleBackfillComplete
    );

    this.pendingBackfills[gameId] = backfillId;
    dispatch(startBackfill(gameId, backfillId));
  }

  handleBackfillComplete = ({
    gameId,
    backfillId,
    backfillRes
  }: OnBackfillCompleteArgs) => {
    if (!this.pendingBackfills[gameId]) {
      console.warn(`Game id for completed backfill missing`);
      return;
    }

    if (backfillId !== this.pendingBackfills[gameId]) {
      console.warn(`Completed backfill doesn't match pending backfill id`);
      return;
    }

    // Up to this point we can consider the backfill to have been canceled (via
    // unmount) or invalidated (via newer backfill for same gamed id). From here
    // on the backfill either succeded or failed, but the response is expected.
    const { getState, dispatch } = this.getStore();
    const { backfills, games } = getState();

    this.pendingBackfills = omit(this.pendingBackfills, gameId);
    dispatch(endBackfill(backfillId));

    if (!backfillRes) {
      console.warn(`Backfill failed, removing game ${gameId} from state`);
      dispatch(removeGame(gameId));
      return;
    }

    if (!games[gameId]) {
      console.warn(`Backfill completed for missing game ${gameId}`);
      return;
    }

    const { actions } = backfillRes;
    const { queuedActions } = backfills[gameId];
    const mergedActions = [...actions, ...queuedActions];
    const uniqActions = uniqWith(mergedActions, compareGameActions);
    const validActions = getValidActionChain(uniqActions, games[gameId]);

    // TODO: Dispatch events at an interval, to convey the rhythm in
    // which the actions were originally performed
    validActions.forEach(dispatch);

    const numDupes = mergedActions.length - uniqActions.length;
    console.log(
      `Backfilled ${uniqActions.length} actions (${numDupes} dupes).`
    );

    const numInvalid = uniqActions.length - validActions.length;
    if (numInvalid) {
      logError(`Corrupt backfill: ${numInvalid} actions discarded`, {
        games,
        gameId,
        actions,
        queuedActions
      });
    }
  };

  handleBroadcastGameAction = (action: JoinGameAction | ThunkAction) => {
    const { getState, dispatch } = this.getStore();
    const { backfills, curGame } = getState();

    if (!curGame) {
      console.warn('Action broadcast with no current game denied');
      return;
    }

    // Disallow user to mutate state until it's up to date with server
    if (backfills[curGame]) {
      console.warn('Action broadcast denied while backfilling');
      return;
    }

    const prevGames = getState().games;

    // I don't know how to statically determine that the game related thunk
    // actions will return a GameAction type $FlowFixMe
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

function getValidActionChain(
  actions: Array<GameAction>,
  game: Game
): Array<GameAction> {
  const sortedActions = sortBy(actions, a => a.payload.actionId);
  const validActions = [];

  // Return the longest link of actions (where each action points to the
  // previous action), from earliest to latest. As soon as a link is missing
  // between two actions, the newer actions are discarded.
  sortedActions.forEach(action => {
    const { userId, gameId, actionId, prevActionId } = action.payload;

    if (gameId !== game.id) {
      console.warn(
        `Action ${actionId} from chain doesn't belong to game ${gameId}`
      );
    } else {
      // The action must point to the previous action OF THE SAME USER
      const prevAction = findLast(
        validActions,
        a => a.payload.userId === userId
      );

      if (!prevAction) {
        const player = getPlayer(game, userId);
        if (prevActionId === player.lastActionId) {
          validActions.push(action);
        }
      } else if (prevActionId === prevAction.payload.actionId) {
        validActions.push(action);
      }
    }
  });

  return validActions;
}
