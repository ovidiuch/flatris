// @flow

import type { GameId, Game } from '../types/state';

export type Games = { [id: GameId]: Game };

export const games: Games = {};
