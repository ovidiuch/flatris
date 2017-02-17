import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import createReduxProxy from 'react-cosmos-redux-proxy';
import flatrisReducer from '../src/reducer';

export default () => {
  return createReduxProxy({
    createStore: initialState =>
      createStore(flatrisReducer, initialState, applyMiddleware(thunk))
  });
};
