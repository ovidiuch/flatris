// @flow

import { omit, findKey } from 'lodash';

import type { Backfills } from 'shared/types/state';
import type { Action } from 'shared/types/actions';

const initialState = {};

export function backfillsReducer(
  state: Backfills = initialState,
  action: Action
): Backfills {
  switch (action.type) {
    case 'START_BACKFILL': {
      const { gameId, backfillId } = action.payload;

      return {
        ...state,
        [gameId]: {
          backfillId,
          queuedActions: []
        }
      };
    }

    case 'END_BACKFILL': {
      const { backfillId } = action.payload;

      const gameId = findKey(state, b => b.backfillId === backfillId);
      if (!gameId) {
        return state;
      }

      return omit(state, gameId);
    }

    case 'QUEUE_GAME_ACTION': {
      const { action: queuedAction } = action.payload;
      const { actionId, gameId } = queuedAction.payload;

      const backfill = state[gameId];
      if (!backfill) {
        console.warn(`Trying to queue action ${actionId} outside backfill`);

        return state;
      }

      const { backfillId, queuedActions } = backfill;

      return {
        ...state,
        [gameId]: {
          backfillId,
          queuedActions: [...queuedActions, queuedAction]
        }
      };
    }

    default:
      return state;
  }
}
