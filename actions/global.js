// @flow

import type { User, GameId, Game, Games } from '../types/state';
import type {
  AuthAction,
  DashboardLoadAction,
  AddGameAction,
  OpenGameAction,
  CloseGameAction,
  StripGameEffectsAction
} from '../types/actions';

export function auth(user: User): AuthAction {
  return {
    type: 'AUTH',
    payload: { user }
  };
}

export function loadDashboard({
  games
}: {
  games: Games
}): DashboardLoadAction {
  return {
    type: 'LOAD_DASHBOARD',
    payload: {
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

export function stripGameEffects(): StripGameEffectsAction {
  return {
    type: 'STRIP_GAME_EFFECTS'
  };
}
