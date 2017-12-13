import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
// import initLayout, { layoutReducer } from 'react-redux-layout';

import gameReducer from './reducers/game';
import computeLayout from './layout';

const rootReducer = combineReducers({
  game: gameReducer,
  layout: () => computeLayout({ width: 800, height: 600 })
});

export const initStore = initialState => {
  const store = createStore(rootReducer, initialState, applyMiddleware(thunk));

  // TODO: Bring back layout
  // initLayout({ store, computeLayout });

  return store;
};
