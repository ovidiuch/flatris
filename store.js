import {
  createStore as createReduxStore,
  applyMiddleware,
  combineReducers
} from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import gameReducer from './reducers/game';
import userIdReducer from './reducers/user-id';

const rootReducer = combineReducers({
  game: gameReducer,
  userId: userIdReducer
});

export const createStore = initialState => {
  return createReduxStore(
    rootReducer,
    initialState,
    composeWithDevTools(applyMiddleware(thunk))
  );
};
