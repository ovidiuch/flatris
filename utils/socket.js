// @flow

import io from 'socket.io-client';
import { getApiUrl } from '../utils/api';

import type { GameId } from '../types/state';
import type { Action, GameAction } from '../types/actions';
import type { RoomId } from '../types/api';

type GameActionHandler = (action: GameAction) => void;
type GameRemovedHandler = (gameId: GameId) => void;

let socket;

export function getSocket() {
  if (!socket) {
    socket = io(getApiUrl());
  }

  function subscribe(roomId: RoomId) {
    console.log('[SOCKET] subscribe', roomId);
    socket.emit('subscribe', roomId);
  }

  function onGameAction(handler: GameActionHandler) {
    socket.on('game-action', handler);
  }

  function offGameAction(handler: GameActionHandler) {
    socket.off('game-action', handler);
  }

  function onGameRemoved(handler: GameRemovedHandler) {
    socket.on('game-removed', handler);
  }

  function offGameRemoved(handler: GameRemovedHandler) {
    socket.off('game-removed', handler);
  }

  function broadcastAction(action: Action) {
    // console.log('[SOCKET] Emit game-action', resAction);
    socket.emit('game-action', action);
  }

  return {
    subscribe,
    onGameAction,
    offGameAction,
    onGameRemoved,
    offGameRemoved,
    broadcastAction
  };
}
