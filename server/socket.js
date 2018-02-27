// @flow

import socketIo from 'socket.io';
import { omit, difference } from 'lodash';
import { gameReducer } from '../reducers/game';
import { games, saveGameAction } from './db';

import type { GameId } from '../types/state';
import type { GameAction } from '../types/actions';

export function attachSocket(server: net$Server) {
  const io = socketIo(server);

  io.on('connect', socket => {
    console.log('New socket connection');

    socket.on('follow-games', (gameIds: Array<GameId>) => {
      console.log(`[SOCKET] follow-games ${gameIds.join(', ')}`);

      const prevRooms = Object.keys(omit(socket.rooms, socket.id));
      const roomsToJoin = difference(gameIds, prevRooms);
      const roomsToLeave = difference(prevRooms, gameIds);

      socket.join(roomsToJoin);
      roomsToLeave.forEach(gameId => socket.leave(gameId));
    });

    socket.on('game-action', (action: GameAction) => {
      // console.log('[SOCKET] game-action', action);

      const { gameId } = action.payload;
      if (!games[gameId]) {
        console.error('Received message for missing game', gameId);
      } else {
        saveGameAction(action);
        games[gameId] = gameReducer(games[gameId], action);

        socket.to(gameId).broadcast.emit('game-action', action);
      }
    });
  });
}
