// @flow

import { backfillGameActions } from '../utils/api';

import type { Game } from '../types/state';
import type { BackfillRanges, BackfillResult } from '../types/backfill';

let lastBackfillId = 0;
let backfillCanceled = false;

export function startBackfill(
  games: Array<Game>,
  onComplete: (result: BackfillResult) => void
): number {
  const backfillId = ++lastBackfillId;
  backfillCanceled = false;

  const ranges = getBackfillRanges(games);
  backfillGameActions(ranges).then(result => {
    // Backfill will be cancelled either via cancelBackfill or if a new
    // backfill is requested (ie. only one backfill can occur at the same time)
    if (lastBackfillId === backfillId && !backfillCanceled) {
      onComplete(result);
    }
  });

  return backfillId;
}

export function cancelBackfill(backfillId: number) {
  if (lastBackfillId === backfillId) {
    backfillCanceled = true;
  }
}

function getBackfillRanges(games: Array<Game>): BackfillRanges {
  return games.map(game => ({
    gameId: game.id,
    players: game.players.map(p => ({
      userId: p.user.id,
      from: p.lastActionId
    }))
  }));
}
