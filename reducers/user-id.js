// @flow

import type { Action } from '../types';

export default (state: void | number, action: Action): number => {
  if (typeof state === 'undefined') {
    return 0;
  }

  switch (action.type) {
    case 'START_GAME':
      return action.payload.curUser.id;
    default:
      return state;
  }
};
