// @flow

import { omit } from 'lodash';
import { backfillGameActions } from '../utils/api';

import type { GameId, Game } from '../types/state';
import type { BackfillRequest, BackfillResponse } from '../types/api';

let backfills: Array<GameId> = [];

export function requestBackfill(
  game: Game,
  onComplete: (result: BackfillResponse) => mixed,
  onError: (gameId: GameId) => mixed
) {
  // Disallow more than one backfill for the same game at once
  if (existsBackfill(game.id)) {
    console.warn(`Disallowing multiple backfill for ${game.id}`);
    return;
  }

  const req = getBackfillReq(game);

  backfills = [...backfills, game.id];

  backfillGameActions(req).then(
    res => {
      // Only call the complete handler if the backfill wasn't cancelled
      if (existsBackfill(game.id)) {
        onComplete(res);
      }
    },
    () => {
      onError(game.id);
    }
  );
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

function existsBackfill(gameId: GameId) {
  return backfills.indexOf(gameId) !== -1;
}
