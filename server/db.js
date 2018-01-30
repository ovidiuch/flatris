// @flow

import type { GameId, Game, User } from '../types/state';

export type Games = { [id: GameId]: Game };

export const games: Games = {};

export type SessionId = number;
export type Sessions = { [id: SessionId]: User };

export const sessions: Sessions = {};
