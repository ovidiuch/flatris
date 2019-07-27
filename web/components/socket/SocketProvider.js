// @flow

import { func } from 'prop-types';
import { uniqWith, sortBy, omit, without } from 'lodash';
import { Component } from 'react';
import { getGame } from '../../utils/api';
import { getSocket } from '../../utils/socket';
import { logError } from '../../utils/rollbar-client';
import { requestBackfill } from '../../utils/backfill';
import { getGameActionOffset } from 'shared/reducers/game';
import {
  addGame,
  removeGame,
  startBackfill,
  endBackfill,
  queueGameAction,
  updateStats
} from '../../actions/global';

import type { Node } from 'react';
import type {
  GameId,
  Game,
  BackfillId,
  Stats,
  State
} from 'shared/types/state';
import type {
  JoinGameAction,
  GameAction,
  ThunkAction,
  Dispatch
} from 'shared/types/actions';
import type { RoomId } from 'shared/types/api';
import type { OnBackfillCompleteArgs } from '../../utils/backfill';

const {
  subscribe,
  keepGameAlive,
  broadcastAction,
  onGameAction,
  offGameAction,
  onGameKeepAlive,
  offGameKeepAlive,
  onGameRemoved,
  offGameRemoved,
  onGameSync,
  offGameSync,
  onStatsUpdate,
  offStatsUpdate
} = getSocket();

type Props = {
  children: Node,
  store: { getState: () => State, dispatch: Dispatch }
};

export class SocketProvider extends Component<Props> {
  static childContextTypes = {
    subscribe: func.isRequired,
    keepGameAlive: func.isRequired,
    broadcastGameAction: func.isRequired,
    onGameKeepAlive: func.isRequired,
    offGameKeepAlive: func.isRequired
  };

  pendingBackfills: { [gameId: GameId]: BackfillId } = {};
  pendingGames: Array<GameId> = [];

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
    onGameSync(this.handleGameSync);
    onStatsUpdate(this.handleStatsUpdate);
  }

  componentWillUnmount() {
    const { dispatch } = this.getStore();

    offGameAction(this.handleGameAction);
    offGameKeepAlive(this.handleGameKeepAlive);
    offGameRemoved(this.handleGameRemoved);
    offGameSync(this.handleGameSync);
    offStatsUpdate(this.handleStatsUpdate);

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

  handleGameSync = (game: Game) => {
    console.log('Received game state from server', game.id);

    const { getState, dispatch } = this.getStore();
    const { games } = getState();

    if (games[game.id]) {
      // NOTE: Use ADD_GAME action to update an existing game
      dispatch(addGame(game));
    } else {
      console.warn('Recevied game sync for missing game', game.id);
    }
  };

  handleStatsUpdate = (stats: Stats) => {
    const { dispatch } = this.getStore();
    dispatch(updateStats(stats));
  };

  handleSubscribe = (roomId: RoomId) => {
    subscribe(roomId);

    if (roomId !== 'global') {
      this.startBackfill(roomId);
    }
  };

  async loadGame(gameId: GameId) {
    if (this.pendingGames.indexOf(gameId) !== -1) {
      // Already fetching game...
      return;
    }

    console.log(`Detected new game ${gameId}...`);

    // Actions come quick, so make sure to not request the game multiple times
    this.pendingGames = [...this.pendingGames, gameId];

    const { dispatch } = this.getStore();
    const game = await getGame(gameId);
    dispatch(addGame(game));

    this.pendingGames = without(this.pendingGames, gameId);
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
    const game = games[gameId];

    this.pendingBackfills = omit(this.pendingBackfills, gameId);
    dispatch(endBackfill(backfillId));

    if (!backfillRes) {
      console.warn(`Backfill failed, removing game ${gameId} from state`);
      dispatch(removeGame(gameId));
      return;
    }

    if (!game) {
      console.warn(`Backfill completed for missing game ${gameId}`);
      return;
    }

    const { actions } = backfillRes;
    const { queuedActions } = backfills[gameId];
    const mergedActions = [...actions, ...queuedActions];
    const uniqActions = uniqWith(mergedActions, compareGameActions);
    const sortedActions = sortBy(uniqActions, a => a.payload.actionId);

    // TODO: Dispatch events at an interval, to convey the rhythm in
    // which the actions were originally performed
    try {
      sortedActions.forEach(dispatch);

      const numDupes = mergedActions.length - uniqActions.length;
      console.log(
        `Backfilled ${uniqActions.length} actions (${numDupes} dupes).`
      );
    } catch (err) {
      // Error minigation: Sometimes client state gets out of sync with server
      // state. In this case we remove the client state and await for a new
      // game action, which will then fetch the game from scratch from server.
      dispatch(removeGame(gameId));

      logError(`Backfill failed`, {
        game,
        backfillRes,
        queuedActions,
        sortedActions
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
    const {
      payload: { gameId }
    } = resAction;

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

  getStore() {
    return this.props.store;
  }
}

function compareGameActions(a1: GameAction, a2: GameAction): boolean {
  return (
    a1.payload.actionId === a2.payload.actionId &&
    a1.payload.userId === a2.payload.userId &&
    a1.payload.gameId === a2.payload.gameId
  );
}
