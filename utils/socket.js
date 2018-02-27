// @flow

import io from 'socket.io-client';
import { getApiUrl } from '../utils/api';

import type { GameId } from '../types/state';
import type { GameAction } from '../types/actions';

type GameActionHandler = (action: GameAction) => void;

let socket;

export function getSocket() {
  if (!socket) {
    socket = io(getApiUrl());
  }

  function followGames(gameIds: Array<GameId>) {
    // console.log('[SOCKET] follow-games', gameIds);
    socket.emit('follow-games', gameIds);
  }

  function onGameAction(handler: GameActionHandler) {
    socket.on('game-action', handler);
  }

  function offGameAction(handler: GameActionHandler) {
    socket.off('game-action', handler);
  }

  function broadcastAction(action: GameAction) {
    // console.log('[SOCKET] Emit game-action', resAction);
    socket.emit('game-action', action);
  }

  return {
    followGames,
    onGameAction,
    offGameAction,
    broadcastAction
  };
}
