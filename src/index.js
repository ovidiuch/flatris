import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import flatrisReducer from './reducer';
import FlatrisGame from './components/FlatrisGame.jsx';
import newGame from './components/__fixtures__/FlatrisGame/new-game';

const store = createStore(flatrisReducer, newGame.reduxState, applyMiddleware(thunk));

ReactDOM.render(
  <Provider store={store}>
    <FlatrisGame />
  </Provider>,
  document.getElementById('root')
);
