// @flow

import type { Action } from 'shared/types/actions';

const initialState = false;

export function jsReadyReducer(
  state: boolean = initialState,
  action: Action
): boolean {
  switch (action.type) {
    case 'JS_LOAD': {
      return true;
    }

    default:
      return state;
  }
}
