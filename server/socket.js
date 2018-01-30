// @flow

import socketIo from 'socket.io';
import { gameReducer } from '../reducers/game';
import { games } from './db';

import type { GameAction } from '../types/actions';

export function attachSocket(server: net$Server) {
  const io = socketIo(server);

  io.on('connect', socket => {
    socket.on('message', (action: GameAction) => {
      console.log('Game action', action);

      const { gameId } = action.payload;
      if (!games[gameId]) {
        console.error('Received message for missing game', gameId);
      } else {
        games[gameId] = gameReducer(games[gameId], action);
        socket.broadcast.emit('message', action);
      }
    });
  });
}
