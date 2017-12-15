import createReduxProxy from 'react-cosmos-redux-proxy';
import { createStore } from './store';

export default [
  createReduxProxy({
    createStore
  })
];
