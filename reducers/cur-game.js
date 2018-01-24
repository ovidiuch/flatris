// @flow

import { gameReducer } from './game';

import type { Game, State } from '../types/state';
import type { Action } from '../types/actions';

export function curGameReducer(state: void | ?Game, action: Action): ?Game {
  if (typeof state === 'undefined') {
    return null;
  }

  switch (action.type) {
    case 'CREATE_GAME':
      return gameReducer(undefined, action);
    case 'JOIN_GAME':
    case 'PLAYER_READY':
    case 'DROP':
    case 'MOVE_LEFT':
    case 'MOVE_RIGHT':
    case 'ROTATE':
    case 'ENABLE_ACCELERATION':
    case 'DISABLE_ACCELERATION':
    case 'APPEND_PENDING_BLOCKS': {
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
