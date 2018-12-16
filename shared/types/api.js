// @flow

import type { UserId, GameId } from './state';
import type { GameAction } from './actions';

export type RoomId = 'global' | GameId;

export type BackfillRequest = {
  gameId: GameId,
  players: Array<{
    userId: UserId,
    from: number
  }>
};

export type BackfillResponse = {
  gameId: GameId,
  actions: Array<GameAction>
};
