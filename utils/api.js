// @flow

import fetch from 'isomorphic-unfetch';
import cookie from 'cookie';
import { getValidUser } from '../utils/validation';
import { auth } from '../actions';

import type { Store } from 'redux'; // eslint-disable-line import/named
import type { User, GameId, Game, State } from '../types/state';
import type { Action } from '../types/actions';

// NOTE: This method is strictly called on the server side
export async function addCurUserToState(
  req: http$IncomingMessage,
  store: Store<State, Action>
) {
  const { sessionId } = cookie.parse(req.headers.cookie || '');
  if (sessionId) {
    try {
      const res = await fetchJson('/auth', {
        headers: {
          cookie: `sessionId=${sessionId}`
        }
      });
      const user = getValidUser(res);
      store.dispatch(auth(user));
    } catch (err) {
      // Nothing to do, user is guest
    }
  }
}

export async function createUserSession(userName: string): Promise<User> {
  return fetchPost('/auth', { userName });
}

export async function getGame(gameId: GameId): Promise<Game> {
  return fetchJson(`/game/${gameId}`);
}

export async function createGame(): Promise<Game> {
  return fetchPost('/game');
}

export function getApiUrl(path?: string) {
  const baseUrl =
    process.env.NODE_ENV === 'production'
      ? getProdBaseUrl()
      : 'http://localhost:4000';

  return path ? `${baseUrl}${path}` : `${baseUrl}/`;
}

function getProdBaseUrl() {
  // Relative paths allow us to serve the prod app from any proxy address (eg.
  // via ngrok), but server-side requests need to contain the host address
  return typeof window === 'undefined' ? 'http://localhost:3000' : '';
}

function fetchJson(urlPath: string, options?: Object): Promise<any> {
  return fetch(getApiUrl(urlPath), options).then(res => res.json());
}

function fetchPost(urlPath: string, body: Object = {}): Promise<any> {
  return fetchJson(urlPath, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  });
}
