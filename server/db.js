// @flow

import crypto from 'crypto';
import { getBlankGame } from '../reducers/game';

import type { GameId, Game, UserId, User } from '../types/state';

export type SessionId = string;
export type Session = { id: SessionId, userId: UserId };

export type Users = { [id: UserId]: User };
export type Sessions = { [id: SessionId]: Session };
export type Games = { [id: GameId]: Game };

export const users: Users = {};
export const games: Games = {};
export const sessions: Sessions = {};

export function insertUser(name: string): User {
  const userId = genRandUniqId(users);
  const user = { id: userId, name };
  users[userId] = user;

  return user;
}

export function insertSession(userId: UserId): Session {
  const sessionId = genRandUniqId(sessions);
  const session = { id: sessionId, userId };
  sessions[sessionId] = session;

  return session;
}

export function insertGame(user: User): Game {
  const gameId = genRandUniqId(games);
  const game = getBlankGame({ id: gameId, user });
  games[gameId] = game;

  return game;
}

function genRandUniqId(collection: { [id: string]: any }): string {
  let id;
  do {
    id = genRandId();
  } while (collection[id]);

  return id;
}

function genRandId(): string {
  return crypto.randomBytes(4).toString('hex');
}
