// @flow

import io from 'socket.io-client';
import { getApiUrl } from '../utils/api';

import type { GameId } from '../types/state';
import type { Action, GameAction } from '../types/actions';
import type { RoomId } from '../types/api';

type GameActionHandler = (action: GameAction) => void;
type GameKeepAliveHandler = (gameId: GameId) => void;
type GameRemovedHandler = (gameId: GameId) => void;

let socket;

// NOTE: We wouldn't need all these proxy methods if Flow supported
// overloading and we'd be able to do:
//
//    type Subscribe = ('subscribe', (gameId: number) => mixed) => void;
//    type KeepGameAlive = ('keep-game-alive', (gameId: number) => mixed) => void;
//    type Emit = Subscribe | KeepGameAlive;
//
export function getSocket() {
  if (!socket) {
    socket = io(getApiUrl());
  }

  function subscribe(roomId: RoomId) {
    console.log('[SOCKET] subscribe', roomId);
    socket.emit('subscribe', roomId);
  }

  function keepGameAlive(gameId: RoomId) {
    console.log('[SOCKET] keep-alive', gameId);
    socket.emit('game-keep-alive', gameId);
  }

  function onGameAction(handler: GameActionHandler) {
    socket.on('game-action', handler);
  }

  function offGameAction(handler: GameActionHandler) {
    socket.off('game-action', handler);
  }

  function onGameKeepAlive(handler: GameKeepAliveHandler) {
    socket.on('game-keep-alive', handler);
  }

  function offGameKeepAlive(handler: GameKeepAliveHandler) {
    socket.off('game-keep-alive', handler);
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
    keepGameAlive,
    onGameAction,
    offGameAction,
    onGameKeepAlive,
    offGameKeepAlive,
    onGameRemoved,
    offGameRemoved,
    broadcastAction
  };
}
