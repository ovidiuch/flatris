// @flow

import { backfillGameActions } from '../utils/api';

import type { GameId, Game, BackfillId } from 'shared/types/state';
import type { BackfillRequest, BackfillResponse } from 'shared/types/api';

let lastBackfillId: BackfillId = 0;

export type OnBackfillCompleteArgs = {
  gameId: GameId,
  backfillId: BackfillId,
  backfillRes: ?BackfillResponse
};

export function requestBackfill(
  game: Game,
  onComplete: OnBackfillCompleteArgs => void
): BackfillId {
  const { id: gameId } = game;

  const backfillId = ++lastBackfillId;
  const backfillReq = getBackfillReq(game);

  console.log('Backfill request', backfillReq);
  backfillGameActions(backfillReq).then(
    backfillRes => {
      onComplete({ gameId, backfillId, backfillRes });
    },
    () => {
      // A null backfillRes will signal an error
      onComplete({ gameId, backfillId, backfillRes: null });
    }
  );

  return backfillId;
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
