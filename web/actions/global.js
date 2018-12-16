// @flow

import type { User, GameId, Game, BackfillId, Stats } from 'shared/types/state';
import type {
  AuthAction,
  UnauthAction,
  DashboardLoadAction,
  AddGameAction,
  RemoveGameAction,
  OpenGameAction,
  CloseGameAction,
  StripGameEffectsAction,
  StartBackfillAction,
  EndBackfillAction,
  QueueGameAction,
  UpdateStatsAction,
  GameAction
} from 'shared/types/actions';

export function auth(user: User): AuthAction {
  return {
    type: 'AUTH',
    payload: { user }
  };
}

export function unauth(): UnauthAction {
  return {
    type: 'UNAUTH'
  };
}

export function loadDashboard({
  games,
  stats
}: {
  games: Array<Game>,
  stats: Stats
}): DashboardLoadAction {
  return {
    type: 'LOAD_DASHBOARD',
    payload: {
      games,
      stats
    }
  };
}

export function addGame(game: Game): AddGameAction {
  return {
    type: 'ADD_GAME',
    payload: {
      game
    }
  };
}

export function removeGame(gameId: GameId): RemoveGameAction {
  return {
    type: 'REMOVE_GAME',
    payload: {
      gameId
    }
  };
}

export function openGame(gameId: GameId): OpenGameAction {
  return {
    type: 'OPEN_GAME',
    payload: {
      gameId
    }
  };
}

export function closeGame(): CloseGameAction {
  return {
    type: 'CLOSE_GAME'
  };
}

export function stripGameEffects(): StripGameEffectsAction {
  return {
    type: 'STRIP_GAME_EFFECTS'
  };
}

export function startBackfill(
  gameId: GameId,
  backfillId: BackfillId
): StartBackfillAction {
  return {
    type: 'START_BACKFILL',
    payload: {
      gameId,
      backfillId
    }
  };
}

export function endBackfill(backfillId: BackfillId): EndBackfillAction {
  return {
    type: 'END_BACKFILL',
    payload: {
      backfillId
    }
  };
}

export function queueGameAction(action: GameAction): QueueGameAction {
  return {
    type: 'QUEUE_GAME_ACTION',
    payload: { action }
  };
}

export function updateStats(stats: Stats): UpdateStatsAction {
  return {
    type: 'UPDATE_STATS',
    payload: { stats }
  };
}
