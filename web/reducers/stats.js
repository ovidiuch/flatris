// @flow

import type { Stats } from 'shared/types/state';
import type { Action } from 'shared/types/actions';

const initialState = {
  actionAcc: 0,
  actionLeft: 0,
  actionRight: 0,
  actionRotate: 0,
  games: 0,
  lines: 0,
  seconds: 0
};

export function statsReducer(
  state: Stats = initialState,
  action: Action
): Stats {
  switch (action.type) {
    case 'LOAD_DASHBOARD':
    case 'UPDATE_STATS': {
      const { stats } = action.payload;

      return stats;
    }

    default:
      return state;
  }
}
