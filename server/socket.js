// @flow

import socketIo from 'socket.io';
import { gameReducer } from '../reducers/game';
import { games } from './db';

import type { GameId } from '../types/state';
import type { GameAction } from '../types/actions';

export function attachSocket(server: net$Server) {
  const io = socketIo(server);

  io.on('connect', socket => {
    socket.on('open-game', (gameId: GameId) => {
      socket.join(gameId);
    });

    socket.on('close-game', (gameId: GameId) => {
      socket.leave(gameId);
    });

    socket.on('game-action', (action: GameAction) => {
      // console.log('[SOCKET] game-action', action);

      const { gameId } = action.payload;
      if (!games[gameId]) {
        console.error('Received message for missing game', gameId);
      } else {
        games[gameId] = gameReducer(games[gameId], action);
        socket.to(gameId).broadcast.emit('game-action', action);
      }
    });
  });
}
