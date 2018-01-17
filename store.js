import {
  createStore as createReduxStore,
  applyMiddleware,
  combineReducers
} from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { gameReducer } from './reducers/game';
import { curUserReducer } from './reducers/cur-user';

const rootReducer = combineReducers({
  curUser: curUserReducer,
  game: gameReducer
});

export const createStore = initialState => {
  return createReduxStore(
    rootReducer,
    initialState,
    composeWithDevTools(applyMiddleware(thunk))
  );
};
