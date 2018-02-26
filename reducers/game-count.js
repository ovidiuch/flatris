// @flow

import type { Action } from '../types/actions';

const initialState = 0;

export function gameCountReducer(
  state: number = initialState,
  action: Action
): number {
  switch (action.type) {
    case 'LOAD_DASHBOARD': {
      return action.payload.gameCount;
    }

    default:
      return state;
  }
}
