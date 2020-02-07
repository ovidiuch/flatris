// @flow

import fetch from 'isomorphic-unfetch';
import cookie from 'cookie';
import { getValidUser } from '../utils/validation';
import { auth } from '../actions/global';

import type { Store } from 'redux'; // eslint-disable-line import/named
import type {
  User,
  GameId,
  Game,
  Stats,
  DailyStats,
  State
} from 'shared/types/state';
import type { Action } from 'shared/types/actions';
import type { BackfillRequest, BackfillResponse } from 'shared/types/api';

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

export async function getDashboard(): Promise<{
  games: Array<Game>,
  stats: Stats
}> {
  return fetchJson(`/dashboard`);
}

export async function getGame(gameId: GameId): Promise<Game> {
  return fetchJson(`/game/${gameId}`);
}

export async function createGame(): Promise<Game> {
  return fetchPost('/game');
}

export async function backfillGameActions(
  req: BackfillRequest
): Promise<BackfillResponse> {
  return fetchPost(`/backfill`, req);
}

export async function getDailyStats(): Promise<DailyStats> {
  return fetchJson(`/daily-stats`);
}

export function getApiUrl(path?: string) {
  const baseUrl =
    process.env.NODE_ENV === 'production'
      ? getProdBaseUrl()
      : 'http://localhost:4000';

  return path ? `${baseUrl}${path}` : `${baseUrl}/`;
}

export function Unauthorized() {
  this.name = 'Unauthorized';
  this.message = 'Invalid user session';
}

function getProdBaseUrl() {
  // Relative paths allow us to serve the prod app from any proxy address (eg.
  // via ngrok), but server-side requests need to contain the host address
  return typeof window === 'undefined' ? 'http://localhost:3000' : '';
}

function fetchJson(urlPath: string, options?: Object): Promise<any> {
  return fetch(getApiUrl(urlPath), options).then(parseResponse);
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

function parseResponse(response) {
  if (response.status >= 200 && response.status < 300) {
    return response.json();
  } else {
    if (response.status === 401) {
      throw new Unauthorized();
    }

    // TODO: Forward server error if response is parsable
    // return response.json().then(
    //   response => {
    //     throw new Error(response.error);
    //   },
    //   () => {
    //     throw new Error('Server error');
    //   }
    // );

    throw new Error('Server error');
  }
}
