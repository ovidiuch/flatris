// @flow

import { omit } from 'lodash';
import {
  createStore as createReduxStore,
  applyMiddleware,
  combineReducers
} from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import io from 'socket.io-client';
import { gameReducer, getCurGame, allPlayersReady } from './reducers/game';
import { curUserReducer } from './reducers/cur-user';
import { startGame } from './actions';

import type { State } from './types/state';

const rootReducer = combineReducers({
  curUser: curUserReducer,
  game: gameReducer
});

const socket = io('http://localhost:4000');

export function createStore(initialState: State) {
  const store = createReduxStore(
    rootReducer,
    initialState,
    composeWithDevTools(applyMiddleware(thunk, socketBroadcast))
  );

  // Start game after all players broadcasted that they're READY
  store.subscribe(() => {
    if (store.getState().game) {
      const game = getCurGame(store.getState());
      if (game.status === 'PENDING' && allPlayersReady(game)) {
        store.dispatch(startGame());
      }
    }
  });

  socket.on('message', msg => {
    // console.log('on message', msg);
    store.dispatch(msg);
  });

  return store;
}

function socketBroadcast() {
  return next => action => {
    const { broadcast } = action;

    if (broadcast) {
      // console.log('broadcast', action);
      socket.emit('message', omit(action, 'broadcast'));
    }

    return next(action);
  };
}

