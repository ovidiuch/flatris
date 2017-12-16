import React from 'react';
import createReduxProxy from 'react-cosmos-redux-proxy';
import FlatrisGame from './components/FlatrisGame';
import GameContainer from './components/GameContainer';
import { createStore } from './store';

const ViewportContainer = props => {
  const { nextProxy, fixture: { component } } = props;
  const { value: NextProxy, next } = nextProxy;
  const nextEl = <NextProxy {...props} nextProxy={next()} />;

  if (component === FlatrisGame) {
    return <GameContainer>{nextEl}</GameContainer>;
  }

  return nextEl;
};

export default [
  ViewportContainer,
  createReduxProxy({
    createStore
  })
];
