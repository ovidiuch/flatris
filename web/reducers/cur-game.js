// @flow

import type { GameId, Game, State } from 'shared/types/state';
import type { Action } from 'shared/types/actions';

const initialState = null;

export function curGameReducer(
  state: ?GameId = initialState,
  action: Action
): ?GameId {
  switch (action.type) {
    case 'OPEN_GAME': {
      const { gameId } = action.payload;

      return gameId;
    }

    case 'CLOSE_GAME': {
      return null;
    }

    default:
      return state;
  }
}

export function getCurGame({ games, curGame }: State): Game {
  if (!curGame) {
    throw new Error('Current game is missing from state');
  }

  if (!games[curGame]) {
    throw new Error(`Current game points to missing game ${curGame}`);
  }

  return games[curGame];
}
