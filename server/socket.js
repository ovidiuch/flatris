// @flow

import socketIo from 'socket.io';
import { omit, difference } from 'lodash';
import {
  gameReducer,
  getPlayer,
  getTurnCount,
  getLineCount
} from '../reducers/game';
import { games, saveGameAction, bumpActiveGame } from './db';
import { incrementTurnCount, incrementLineCount } from './firebase';
import { rollbar } from './rollbar';

import type { GameId } from '../types/state';
import type { GameAction } from '../types/actions';
import type { RoomId } from '../types/api';

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

          // Did the player(s) start another turn?
          if (getTurnCount(game) > getTurnCount(prevGame)) {
            incrementTurnCount();
            incrementLineCount(getLineCount(prevGame));
          } else if (game.players.length !== prevGame.players.length) {
            // Still count lines when solo game becomes multi
            incrementLineCount(getLineCount(prevGame));
          }
        } catch (err) {
          const player = getPlayer(prevGame, action.payload.userId);
          const syncId = `${prevGame.id}-${player.lastActionId}`;

          // Prevent syncing more than once for the same player. Context: After
          // going offline and back online, often many messages are queued and
          // sent all at once. In the past this would flood the logs and
          // trigger hundreds of game-sync events at once.
          if (!gameSync[syncId]) {
            gameSync[syncId] = true;

            rollbar.error(err, { action });

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
}

const gameSync: {
  [id: string]: true
} = {};
