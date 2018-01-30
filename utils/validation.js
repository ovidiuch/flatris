// @flow

import type { User } from '../types/state';

export function getValidUser(user: mixed): User {
  if (!user || typeof user.id !== 'number' || typeof user.name !== 'string') {
    throw new Error(`Invalid user: ${String(user)}`);
  }

  return {
    id: user.id,
    name: user.name
  };
}
