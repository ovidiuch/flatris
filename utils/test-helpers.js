// @flow

import type { User } from '../types/state';

export function getSampleUser(): User {
  return {
    id: '99bba208',
    name: 'Tig'
  };
}

export function getSampleUser2(): User {
  return {
    id: '018ac29a',
    name: 'Louie'
  };
}

export function getSampleUser3(): User {
  return {
    id: '12b3ef',
    name: 'Bill'
  };
}

export async function doAfter(delay: number, fn: () => mixed) {
  return new Promise(res => {
    setTimeout(() => {
      fn();
      res();
    }, delay);
  });
}
