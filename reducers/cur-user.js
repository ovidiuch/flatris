// @flow

import type { User, State } from '../types/state';
import type { Action } from '../types/actions';

export function curUserReducer(state: void | User, action: Action): ?User {
  if (typeof state === 'undefined') {
    return null;
  }

  switch (action.type) {
    case 'AUTH': {
      const { userId, userName } = action.payload;

      return { id: userId, name: userName };
    }

    default:
      return state;
  }
}

export function getCurUser(state: State): User {
  if (!state.curUser) {
    throw new Error('Current user is missing from state');
  }

  return state.curUser;
}
