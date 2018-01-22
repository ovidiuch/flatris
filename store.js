// @flow

import {
  createStore as createReduxStore,
  applyMiddleware,
  combineReducers
} from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { curGameReducer } from './reducers/cur-game';
import { curUserReducer } from './reducers/cur-user';

import type { State } from './types/state';

const rootReducer = combineReducers({
  curUser: curUserReducer,
  curGame: curGameReducer
});

export function createStore(initialState: State) {
  return createReduxStore(
    rootReducer,
    initialState,
    composeWithDevTools(applyMiddleware(thunk))
  );
}
