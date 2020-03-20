// @flow

import socketIo from 'socket.io';
import { omit, difference } from 'lodash';
import { gameReducer, getPlayer } from 'shared/reducers/game';
import {
  ACTION_STATS_FLUSH_INTERVAL,
  ACTION_STATS_FLUSH_DELAY
} from 'shared/constants/timeouts';
import { games, saveGameAction, bumpActiveGame } from './db';
import {
  onStatsChange,
  incrementTurnCount,
  incrementLineCount,
  incrementActionLeft,
  incrementActionRight,
  incrementActionAcc,
  incrementActionRotate,
  incrementGameTime
} from './firebase';

import type { GameId, Game } from 'shared/types/state';
import type { GameAction } from 'shared/types/actions';
import type { RoomId } from 'shared/types/api';

export function attachSocket(server: net$Server) {
  const io = socketIo(server);

  io.on('connect', socket => {
    console.log('New socket connection');

    socket.on('subscribe', (roomId: RoomId) => {
      console.log(`[SOCKET] subscribe ${roomId}`);

      const prevRooms = Object.keys(omit(socket.rooms, socket.id));
      const roomsToJoin = difference([roomId], prevRooms);
      const roomsToLeave = difference(prevRooms, [roomId]);

      socket.join(roomsToJoin);
      roomsToLeave.forEach(gameId => socket.leave(gameId));
    });

    socket.on('game-keep-alive', (gameId: GameId) => {
      console.log(`[SOCKET] game-keep-alive ${gameId}`);

      if (!games[gameId]) {
        // NOTE: This message can flood the logs if client gets stuck
        // console.warn(`Received keep-alive for missing game ${gameId}`);

        // Notify client to leave expired game page
        socket.emit('game-removed', gameId);
      } else {
        // As long as games are open they are marked as active
        bumpActiveGame(gameId);

        socket.to('global').broadcast.emit('game-keep-alive', gameId);
      }
    });

    socket.on('game-action', (action: GameAction) => {
      // console.log('[SOCKET] game-action', action);

      const { gameId } = action.payload;
      const prevGame = games[gameId];
      if (!prevGame) {
        // NOTE: This message can flood the logs if client gets stuck
        // console.warn(`Received keep-alive for missing game ${gameId}`);

        // Notify client to leave expired game page
        socket.emit('game-removed', gameId);
      } else {
        try {
          const game = gameReducer(prevGame, action);
          games[gameId] = game;

          // Only save game action after game reducer was run successfully
          saveGameAction(action);

          // As long as games receive actions they are marked as active
          bumpActiveGame(gameId);

          socket
            .to(gameId)
            // TODO: Filter which actions get sent to `global` if volume is high
            .to('global')
            .broadcast.emit('game-action', action);

          countTurns(game, prevGame);
          countControlAction(action);
          countLines(action, game, prevGame);
          countGameTime(action);
        } catch (err) {
          const player = getPlayer(prevGame, action.payload.userId);
          const syncId = `${prevGame.id}-${player.lastActionId}`;

          // Prevent syncing more than once for the same player. Context: After
          // going offline and back online, often many messages are queued and
          // sent all at once. In the past this would flood the logs and
          // trigger hundreds of game-sync events at once.
          if (!gameSync[syncId]) {
            gameSync[syncId] = true;

            // Sync client state with server state. This happens when one client
            // goes offline for a while and then goes back online. Upon
            // reconnecting the client will have a going-back-in-time experience,
            // as all their actions that were performed during the offline period
            // will be canceled
            // NOTE: This is not enough if client doesn't also join game room
            // again upon reconnect
            socket.emit('game-sync', prevGame);
          }
        }
      }
    });
  });

  onStatsChange(stats => {
    io.to('global').emit('stats', stats);
  });
}

const gameSync: {
  [id: string]: true
} = {};

let pendingLeftCount = 0;
let pendingRightCount = 0;
let pendingAccCount = 0;
let pendingRotateCount = 0;
let pendingTimeCount = 0;

function countTurns(game: Game, prevGame: Game) {
  // Did the player(s) start another turn?
  if (game.players[0].drops === 0 && prevGame.players[0].drops > 0) {
    incrementTurnCount();
  }
}

function countLines(action: GameAction, game: Game, prevGame: Game) {
  // Did the players make any line(s)?
  if (action.type !== 'JOIN_GAME') {
    const { userId } = action.payload;
    const prevPlayer = getPlayer(prevGame, userId);
    const player = getPlayer(game, userId);

    if (player.lines > prevPlayer.lines) {
      incrementLineCount(player.lines - prevPlayer.lines);
    }
  }
}

function countControlAction(action: GameAction) {
  // Did the players make any control action?
  switch (action.type) {
    case 'MOVE_LEFT': {
      pendingLeftCount++;
      break;
    }
    case 'MOVE_RIGHT': {
      pendingRightCount++;
      break;
    }
    case 'ENABLE_ACCELERATION': {
      pendingAccCount++;
      break;
    }
    case 'ROTATE': {
      pendingRotateCount++;
      break;
    }
  }
}

function countGameTime(action: GameAction) {
  if (action.type !== 'JOIN_GAME') {
    const { actionId, prevActionId } = action.payload;
    const time = actionId - prevActionId;

    // Don't count any break bigger than 30s between action as play time.
    // That would be cheating ;)
    if (time > 0 && time < 30000) {
      pendingTimeCount += time;
    }
  }
}

function flushLeftCounts() {
  if (pendingLeftCount) {
    incrementActionLeft(pendingLeftCount);
    pendingLeftCount = 0;
  }
}

function flushRightCount() {
  if (pendingRightCount) {
    incrementActionRight(pendingRightCount);
    pendingRightCount = 0;
  }
}

function flushAccCount() {
  if (pendingAccCount) {
    incrementActionAcc(pendingAccCount);
    pendingAccCount = 0;
  }
}

function flushRotateCount() {
  if (pendingRotateCount) {
    incrementActionRotate(pendingRotateCount);
    pendingRotateCount = 0;
  }
}

function flushTimeCount() {
  if (pendingTimeCount) {
    const rounded = Math.round(pendingTimeCount / 1000);
    incrementGameTime(rounded);
    pendingTimeCount -= rounded * 1000;
  }
}

// Flush counts alternatively to make the stats update more lively :)
setTimeout(
  () => setInterval(flushLeftCounts, ACTION_STATS_FLUSH_INTERVAL),
  ACTION_STATS_FLUSH_DELAY * 0
);
setTimeout(
  () => setInterval(flushRightCount, ACTION_STATS_FLUSH_INTERVAL),
  ACTION_STATS_FLUSH_DELAY * 1
);
setTimeout(
  () => setInterval(flushAccCount, ACTION_STATS_FLUSH_INTERVAL),
  ACTION_STATS_FLUSH_DELAY * 2
);
setTimeout(
  () => setInterval(flushRotateCount, ACTION_STATS_FLUSH_INTERVAL),
  ACTION_STATS_FLUSH_DELAY * 3
);
setTimeout(
  () => setInterval(flushTimeCount, ACTION_STATS_FLUSH_INTERVAL),
  ACTION_STATS_FLUSH_DELAY * 4
);
