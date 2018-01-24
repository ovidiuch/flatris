// @flow

import type { User } from '../types/state';

export function getSampleUser(): User {
  return {
    id: 1,
    name: 'Tig'
  };
}

export function getSampleUser2(): User {
  return {
    id: 2,
    name: 'Louie'
  };
}
