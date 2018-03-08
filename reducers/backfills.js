// @flow

import { omit } from 'lodash';

import type { Backfills } from '../types/state';
import type { Action } from '../types/actions';

const initialState = {};

export function backfillsReducer(
  state: Backfills = initialState,
  action: Action
): Backfills {
  switch (action.type) {
    case 'START_BACKFILL': {
      const { gameId } = action.payload;

      return {
        ...state,
        [gameId]: []
      };
    }

    case 'END_BACKFILL': {
      const { gameId } = action.payload;

      return omit(state, gameId);
    }

    case 'QUEUE_GAME_ACTION': {
      const { action: queuedAction } = action.payload;
      const { gameId } = queuedAction.payload;
      const backfill = state[gameId];

      if (!backfill) {
        const { actionId } = queuedAction.payload;
        console.warn(`Trying to queue action ${actionId} outside backfill`);

        return state;
      }

      return {
        ...state,
        [gameId]: [...backfill, queuedAction]
      };
    }

    default:
      return state;
  }
}
