// @flow

import type { GameId, Game, Games } from '../types/state';
import type {
  DashboardLoadAction,
  AddGameAction,
  OpenGameAction
} from '../types/actions';

export function loadDashboard({
  gameCount,
  games
}: {
  gameCount: number,
  games: Games
}): DashboardLoadAction {
  return {
    type: 'LOAD_DASHBOARD',
    payload: {
      gameCount,
      games
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

export function openGame(gameId: GameId): OpenGameAction {
  return {
    type: 'OPEN_GAME',
    payload: {
      gameId
    }
  };
}
