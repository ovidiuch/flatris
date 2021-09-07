/* global window */
// @flow

import type { GameId } from 'shared/types/state';

export function getShareUrl(gameId: GameId) {
  if (typeof window === 'undefined') {
    return '';
  }

  // NOTE: This code only works in to browser (ie. not on the server). SSR
  // will return a disabled copy button.
  const { protocol, host } = window.location;

  return `${protocol}//${host}/join/${gameId}`;
}
