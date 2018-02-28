// @flow

import { func } from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import createReduxProxy from 'react-cosmos-redux-proxy';
import GameContainer from './components/GameContainer';
import { createStore } from './store';

import type { ComponentType, Node } from 'react';
import type { Action, ThunkAction } from './types/actions';

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

type SocketProviderProps = {
  children: Node,
  dispatch: (Action | ThunkAction) => Action
};

class SocketProviderRaw extends Component<SocketProviderProps> {
  static childContextTypes = {
    subscribe: func.isRequired,
    broadcastGameAction: func.isRequired
  };

  getChildContext() {
    return {
      subscribe: this.handleFollowGames,
      broadcastGameAction: this.handleBroadcastGameAction
    };
  }

  handleFollowGames = following => {
    console.log('Follow games', following);
  };

  handleBroadcastGameAction = (action: Action) => {
    const { dispatch } = this.props;

    // The final action is returned from async thunk actions
    dispatch(action);
  };

  render() {
    return this.props.children;
  }
}

const SocketProvider = connect()(SocketProviderRaw);

const SocketProviderProxy = (props: ProxyProps) => {
  const {
    nextProxy: { value: NextProxy, next },
    fixture: { reduxState }
  } = props;
  const nextEl = <NextProxy {...props} nextProxy={next()} />;

  return reduxState ? <SocketProvider>{nextEl}</SocketProvider> : nextEl;
};

export default [
  GameContainerProxy,
  createReduxProxy({
    createStore
  }),
  SocketProviderProxy
];
