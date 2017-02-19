import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import flatrisReducer from './reducer';
import computeLayout from './layout';
import LayoutProvider from './lib/layout-provider';
import App from './App.jsx';
import newGame from './components/__fixtures__/FlatrisGame/new-game';

// Unload previous state from local storage if present, otherwise
// a blank Flatris instance will be rendered
const prevState = localStorage.getItem('flatrisState');
const initialState = prevState ? JSON.parse(prevState) : newGame.reduxState;

const store = createStore(flatrisReducer, initialState, applyMiddleware(thunk));

ReactDOM.render(
  <Provider store={store}>
    <LayoutProvider computeLayout={computeLayout}>
      <App />
    </LayoutProvider>
  </Provider>,
  document.getElementById('root')
);

window.addEventListener('unload', () => {
  localStorage.setItem('flatrisState', JSON.stringify(store.getState()));
});
