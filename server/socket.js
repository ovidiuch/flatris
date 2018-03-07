// @flow

import socketIo from 'socket.io';
import { omit, difference } from 'lodash';
import { gameReducer } from '../reducers/game';
import { games, saveGameAction, bumpActiveGame } from './db';
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
        rollbar.warning(`Received keep-alive for missing game ${gameId}`);

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
      if (!games[gameId]) {
        // NOTE: This message can flood the logs if client gets stuck
        rollbar.warning(`Received keep-alive for missing game ${gameId}`);

        // Notify client to leave expired game page
        socket.emit('game-removed', gameId);
      } else {
        try {
          games[gameId] = gameReducer(games[gameId], action);

          // Only save game action after game reducer was run successfully
          saveGameAction(action);

          // As long as games receive actions they are marked as active
          bumpActiveGame(gameId);

          socket
            .to(gameId)
            // TODO: Filter which actions get sent to `global` if volume is high
            .to('global')
            .broadcast.emit('game-action', action);
        } catch (err) {
          rollbar.error(err, { action });
        }
      }
    });
  });
}
