import createNormalizePropsProxy from 'react-cosmos-normalize-props-proxy';
import createReduxProxy from 'react-cosmos-redux-proxy';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import computeLayout from '../src/layout';
import gameReducer from '../src/reducers/game';
import initLayout, { layoutReducer } from 'react-redux-layout';

const rootReducer = combineReducers({
  game: gameReducer,
  layout: layoutReducer
});

let _destroyLayout;

export default [
  createNormalizePropsProxy(),
  createReduxProxy({
    createStore: initialState => {
      if (_destroyLayout) {
        _destroyLayout();
      }

      const store = createStore(
        rootReducer,
        initialState,
        applyMiddleware(thunk)
      );
      _destroyLayout = initLayout({ store, computeLayout });

      return store;
    }
  })
];
