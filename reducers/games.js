// @flow

import { gameReducer, stripGameEffects } from './game';

import type { Games } from '../types/state';
import type { Action } from '../types/actions';

const initialState = {};

export function gamesReducer(
  state: Games = initialState,
  action: Action
): Games {
  switch (action.type) {
    case 'LOAD_DASHBOARD': {
      const { games } = action.payload;

      return Object.keys(games).reduce((acc, gameId) => {
        return {
          ...acc,
          [gameId]: stripGameEffects(games[gameId])
        };
      }, {});
    }

    case 'ADD_GAME': {
      const { game } = action.payload;

      return {
        ...state,
        [game.id]: stripGameEffects(game)
      };
    }

    case 'JOIN_GAME':
    case 'PLAYER_READY':
    case 'PLAYER_PAUSE':
    case 'DROP':
    case 'MOVE_LEFT':
    case 'MOVE_RIGHT':
    case 'ROTATE':
    case 'ENABLE_ACCELERATION':
    case 'DISABLE_ACCELERATION':
    case 'APPEND_PENDING_BLOCKS':
    case 'PING': {
      const { gameId } = action.payload;

      if (!gameId) {
        throw new Error(`Game action ${action.type} has no gameId`);
      }

      if (!state[gameId]) {
        throw new Error(
          `Game action ${action.type} for missing game ${gameId}`
        );
      }

      return {
        ...state,
        [gameId]: gameReducer(state[gameId], action)
      };
    }

    default:
      return state;
  }
}
