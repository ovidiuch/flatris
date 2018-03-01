// @flow

import type { Backfill } from '../types/state';
import type { Action } from '../types/actions';

const initialState = null;

export function backfillReducer(
  state: ?Backfill = initialState,
  action: Action
): ?Backfill {
  switch (action.type) {
    case 'START_BACKFILL': {
      const { backfillId } = action.payload;

      return {
        backfillId,
        queuedActions: []
      };
    }

    case 'END_BACKFILL': {
      return null;
    }

    case 'QUEUE_GAME_ACTION': {
      const { action: queuedAction } = action.payload;

      if (!state) {
        const { actionId } = queuedAction.payload;
        console.warn(`Trying to queue action ${actionId} outside backfill`);

        return state;
      }

      const { backfillId, queuedActions } = state;

      return {
        backfillId,
        queuedActions: [...queuedActions, queuedAction]
      };
    }

    default:
      return state;
  }
}
