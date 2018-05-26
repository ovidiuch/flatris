// @flow

import type { User, State } from 'shared/types/state';
import type { Action } from 'shared/types/actions';

const initialState = null;

export function curUserReducer(
  state: ?User = initialState,
  action: Action
): ?User {
  switch (action.type) {
    case 'AUTH': {
      const { user } = action.payload;

      return user;
    }

    case 'UNAUTH': {
      return null;
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
