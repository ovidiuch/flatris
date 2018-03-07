// @flow

import { omit } from 'lodash';
import { backfillGameActions } from '../utils/api';

import type { GameId, Game } from '../types/state';
import type { BackfillRequest, BackfillResponse } from '../types/api';

let lastBackfillId = 0;
let backfills: { [gameId: GameId]: number } = {};

export function requestBackfill(
  game: Game,
  onComplete: (result: BackfillResponse) => mixed,
  onError: (gameId: GameId) => mixed
): number {
  const { id: gameId } = game;
  const backfillId = ++lastBackfillId;
  backfills = {
    ...backfills,
    [gameId]: backfillId
  };

  const req = getBackfillReq(game);
  backfillGameActions(req).then(
    res => {
      // Backfill will be cancelled either via cancelBackfill or if a new
      // backfill is requested (ie. only one backfill can occur at the same time)
      if (backfills[gameId] === backfillId) {
        onComplete(res);
      }
    },
    () => {
      onError(gameId);
    }
  );

  return backfillId;
}

export function cancelBackfill(gameId: GameId) {
  backfills = omit(backfills, gameId);
}

function getBackfillReq(game: Game): BackfillRequest {
  return {
    gameId: game.id,
    players: game.players.map(p => ({
      userId: p.user.id,
      from: p.lastActionId
    }))
  };
}
