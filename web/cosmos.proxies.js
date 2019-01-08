// @flow

import React, { Component } from 'react';
import createReduxProxy from 'react-cosmos-redux-proxy';
import createFetchProxy from 'react-cosmos-fetch-proxy';
import GameContainer from './components/GameContainer';
import { SocketProviderMock } from './mocks/SocketProviderMock';
import { createStore } from './store';

import type { ComponentType } from 'react';

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

class GameContainerProxy extends Component<ProxyProps> {
  render() {
    const {
      nextProxy: { value: NextProxy, next },
      fixture: { container }
    } = this.props;
    const nextEl = <NextProxy {...this.props} nextProxy={next()} />;

    if (!container) {
      return nextEl;
    }

    const { width, height, backgroundColor = '#fff', opacity = 1 } = container;

    let style = {
      position: 'absolute',
      opacity,
      backgroundColor
    };
    if (width) {
      style = { ...style, width: `calc(100% / 16 * ${width})` };
    }
    if (height) {
      style = { ...style, height: `calc(100% / 20 * ${height})` };
    }

    return (
      <GameContainer>
        <div className="inner-container" style={style}>
          {nextEl}
        </div>
        <style jsx>{`
          .inner-container {
            position: absolute;
            width: 100%;
            height: 100%;
          }
        `}</style>
      </GameContainer>
    );
  }
}

const SocketProviderProxy = (props: ProxyProps) => {
  const {
    nextProxy: { value: NextProxy, next },
    fixture: { reduxState }
  } = props;
  const nextEl = <NextProxy {...props} nextProxy={next()} />;

  return reduxState ? (
    <SocketProviderMock>{nextEl}</SocketProviderMock>
  ) : (
    nextEl
  );
};

export default [
  createFetchProxy(),
  GameContainerProxy,
  createReduxProxy({
    createStore
  }),
  SocketProviderProxy
];
