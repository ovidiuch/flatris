// @flow

import { func } from 'prop-types';
import React, { Component } from 'react';
import createReduxProxy from 'react-cosmos-redux-proxy';
import FlatrisGame from './components/FlatrisGame';
import GameContainer from './components/GameContainer';
import { createStore } from './store';

import type { ComponentType, Node } from 'react';

type LinkedItem<Item> = {
  value: Item,
  next: () => LinkedItem<Item>
};

type ProxyProps = {
  nextProxy: LinkedItem<ComponentType<ProxyProps>>,
  fixture: Object,
  onComponentRef: Function,
  onFixtureUpdate: Function
};

const ViewportContainer = (props: ProxyProps) => {
  const {
    nextProxy: { value: NextProxy, next },
    fixture: { component, opacity = 1 }
  } = props;
  const nextEl = <NextProxy {...props} nextProxy={next()} />;

  if (component === FlatrisGame) {
    return (
      <GameContainer>
        <div style={{ opacity }}>{nextEl}</div>
      </GameContainer>
    );
  }

  return nextEl;
};

class SocketProvider extends Component<{ children: Node }> {
  static childContextTypes = {
    broadcast: func.isRequired
  };

  getChildContext() {
    return {
      broadcast: this.handleBroadcast
    };
  }

  handleBroadcast = async action => {
    console.log('broadcast', action);
  };

  render() {
    return this.props.children;
  }
}

const SocketProviderProxy = (props: ProxyProps) => {
  const {
    nextProxy: { value: NextProxy, next },
    fixture: { reduxState }
  } = props;
  const nextEl = <NextProxy {...props} nextProxy={next()} />;

  return reduxState ? <SocketProvider>{nextEl}</SocketProvider> : nextEl;
};

export default [
  ViewportContainer,
  createReduxProxy({
    createStore
  }),
  SocketProviderProxy
];
