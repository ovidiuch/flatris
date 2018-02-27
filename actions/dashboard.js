// @flow
// TODO: Rename to global.js and add user action here

import type { GameId, Game, Games } from '../types/state';
import type {
  DashboardLoadAction,
  AddGameAction,
  OpenGameAction,
  CloseGameAction
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

export function closeGame(): CloseGameAction {
  return {
    type: 'CLOSE_GAME'
  };
}
