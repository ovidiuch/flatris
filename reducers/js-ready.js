// @flow

import type { Action } from '../types/actions';

export function jsReadyReducer(state: void | boolean, action: Action): boolean {
  if (typeof state === 'undefined') {
    return false;
  }

  switch (action.type) {
    case 'JS_LOAD': {
      return true;
    }

    default:
      return state;
  }
}
