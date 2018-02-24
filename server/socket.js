// @flow

import socketIo from 'socket.io';
import { gameReducer } from '../reducers/game';
import { games, saveGameAction } from './db';

import type { GameId } from '../types/state';
import type { GameAction } from '../types/actions';

export function attachSocket(server: net$Server) {
  const io = socketIo(server);

  io.on('connect', socket => {
    console.log('New socket connection');

    socket.on('open-game', (gameId: GameId) => {
      console.log(`Game opened ${gameId}`);

      socket.join(gameId);
    });

    socket.on('close-game', (gameId: GameId) => {
      console.log(`Game closed ${gameId}`);

      socket.leave(gameId);
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
