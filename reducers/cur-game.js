// @flow

import { gameReducer, getBlankPlayerEffects } from './game';

import type { Game, State } from '../types/state';
import type { Action } from '../types/actions';

export function curGameReducer(state: void | ?Game, action: Action): ?Game {
  if (typeof state === 'undefined') {
    return null;
  }

  switch (action.type) {
    case 'LOAD_GAME': {
      const { game } = action.payload;

      return {
        ...game,
        players: game.players.map(player => ({
          ...player,
          // Strip effects to avoid running them on page load
          ...getBlankPlayerEffects()
        }))
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
      if (!state) {
        throw new Error(`Game action ${action.type} called on null game state`);
      }

      return gameReducer(state, action);
    }
    default:
      return state;
  }
}

export function getCurGame(state: State): Game {
  if (!state.curGame) {
    throw new Error('Current game is missing from state');
  }

  return state.curGame;
}
