// @flow

import type { User } from '../types/state';
import type { AuthAction } from '../types/actions';

export function auth(user: User): AuthAction {
  return {
    type: 'AUTH',
    payload: { user }
  };
}
