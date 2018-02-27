// @flow

import type { UserId, GameId } from './state';
import type { GameAction } from './actions';

export type BackfillRanges = Array<{
  gameId: GameId,
  players: Array<{
    userId: UserId,
    from: number
  }>
}>;

export type BackfillResult = { [GameId]: Array<GameAction> };
