// @flow

import {
  createStore as createReduxStore,
  applyMiddleware,
  combineReducers
} from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { jsReadyReducer } from './reducers/js-ready';
import { gameCountReducer } from './reducers/game-count';
import { gamesReducer } from './reducers/games';
import { curUserReducer } from './reducers/cur-user';
import { curGameReducer } from './reducers/cur-game';

import type { Store } from 'redux'; // eslint-disable-line import/named
import type { State } from './types/state';
import type { Action } from './types/actions';

const rootReducer = combineReducers({
  jsReady: jsReadyReducer,
  curUser: curUserReducer,
  gameCount: gameCountReducer,
  games: gamesReducer,
  curGame: curGameReducer
});

export function createStore(initialState: State): Store<State, Action> {
  return createReduxStore(
    rootReducer,
    initialState,
    composeWithDevTools(applyMiddleware(thunk))
  );
}
