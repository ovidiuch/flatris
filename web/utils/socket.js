// @flow

import io from 'socket.io-client';
import { getApiUrl } from '../utils/api';

import type { GameId, Game, Stats } from 'shared/types/state';
import type { Action, GameAction } from 'shared/types/actions';
import type { RoomId } from 'shared/types/api';

type GameActionHandler = (action: GameAction) => void;
type GameKeepAliveHandler = (gameId: GameId) => void;
type GameRemovedHandler = (gameId: GameId) => void;
type GameSyncHandler = (game: Game) => void;
type StatsUpdateHandler = (stats: Stats) => void;

let socket;

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

  function broadcastAction(action: Action) {
    // console.log('[SOCKET] game-action', resAction);
    socket.emit('game-action', action);
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

  function onGameSync(handler: GameSyncHandler) {
    socket.on('game-sync', handler);
  }

  function offGameSync(handler: GameSyncHandler) {
    socket.off('game-sync', handler);
  }

  function onStatsUpdate(handler: StatsUpdateHandler) {
    socket.on('stats', handler);
  }

  function offStatsUpdate(handler: StatsUpdateHandler) {
    socket.off('stats', handler);
  }

  return {
    subscribe,
    keepGameAlive,
    broadcastAction,
    onGameAction,
    offGameAction,
    onGameKeepAlive,
    offGameKeepAlive,
    onGameRemoved,
    offGameRemoved,
    onGameSync,
    offGameSync,
    onStatsUpdate,
    offStatsUpdate
  };
}
