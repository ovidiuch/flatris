// @flow

import { backfillGameActions } from '../utils/api';

import type { GameId, Game } from '../types/state';
import type { BackfillRequest, BackfillResponse } from '../types/api';

let lastBackfillId = 0;
let backfillCanceled = false;

export function requestBackfill(
  game: Game,
  onComplete: (result: BackfillResponse) => mixed,
  onError: (gameId: GameId) => mixed
): number {
  const backfillId = ++lastBackfillId;
  backfillCanceled = false;

  const req = getBackfillReq(game);
  const { gameId } = req;
  backfillGameActions(req).then(
    res => {
      // Backfill will be cancelled either via cancelBackfill or if a new
      // backfill is requested (ie. only one backfill can occur at the same time)
      if (lastBackfillId === backfillId && !backfillCanceled) {
        onComplete(res);
      }
    },
    () => {
      onError(gameId);
    }
  );

  return backfillId;
}

export function cancelBackfill(backfillId: number) {
  if (lastBackfillId === backfillId) {
    backfillCanceled = true;
  }
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
