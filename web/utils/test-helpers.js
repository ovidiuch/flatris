// @flow

import React from 'react';
import { useDispatch } from 'react-redux';

import type { User } from 'shared/types/state';

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

export function useTimeout(cb: () => mixed, ms: number) {
  React.useEffect(() => {
    const timeoutId = setTimeout(() => cb(), ms);
    return () => clearTimeout(timeoutId);
  }, [cb]);
}

export function useAction(action: {}) {
  const dispatch = useDispatch();
  return React.useCallback(() => dispatch(action), [dispatch]);
}

// TODO: Remove
export async function doAfter(delay: number, fn: () => mixed) {
  return new Promise(res => {
    setTimeout(() => {
      fn();
      res();
    }, delay);
  });
}
