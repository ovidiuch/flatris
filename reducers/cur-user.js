// @flow

import type { User } from '../types/state';

export function curUserReducer(state: void | User): User {
  if (typeof state === 'undefined') {
    return {
      id: 0,
      name: 'Ovid'
    };
  }

  return state;
}
