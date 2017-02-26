import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import gameReducer from './reducers/game';
import initLayout, { layoutReducer } from 'react-redux-layout';
import computeLayout from './layout';
import App from './App.jsx';

// Unload previous state from local storage if present, otherwise
// a blank Flatris instance will be rendered
const prevState = localStorage.getItem('flatrisState');
const initialState = prevState ? { game: JSON.parse(prevState) } : undefined;

const rootReducer = combineReducers({
  game: gameReducer,
  layout: layoutReducer
});

const store = createStore(rootReducer, initialState, applyMiddleware(thunk));

store.subscribe(() => {
  localStorage.setItem('flatrisState', JSON.stringify(store.getState().game));
});

initLayout({ store, computeLayout });

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

if (process.env.NODE_ENV === 'production' && 'serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    navigator.serviceWorker.register('./service-worker.js');
  });
}
