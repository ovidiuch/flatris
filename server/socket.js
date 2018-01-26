// @flow

import socketIo from 'socket.io';
import { gameReducer } from '../reducers/game';

import type { GameAction } from '../types/actions';
import type { Games } from './db';

export function attachSocket({
  games,
  server
}: {
  games: Games,
  server: net$Server
}) {
  const io = socketIo(server);

  io.on('connect', socket => {
    socket.on('message', (action: GameAction) => {
      const { gameId } = action.payload;
      if (action.type === 'CREATE_GAME') {
        games[gameId] = gameReducer(undefined, action);
      } else {
        games[gameId] = gameReducer(games[gameId], action);
      }

      console.log('emit', action);
      socket.broadcast.emit('message', action);
    });
  });
}
