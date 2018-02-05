// @flow

import { func } from 'prop-types';
import classNames from 'classnames';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import createReduxProxy from 'react-cosmos-redux-proxy';
import GameContainer from './components/GameContainer';
import { createStore } from './store';

import type { ComponentType, Node } from 'react';
import type { GameId } from './types/state';
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

class ViewportContainer extends Component<ProxyProps> {
  render() {
    const {
      nextProxy: { value: NextProxy, next },
      fixture: { container }
    } = this.props;
    const nextEl = <NextProxy {...this.props} nextProxy={next()} />;

    if (!container) {
      return nextEl;
    }

    const {
      width,
      height,
      fullHeight = false,
      backgroundColor = '#fff',
      opacity = 1
    } = container;
    const classes = classNames('inner-container', {
      'game-height': fullHeight
    });

    // Dynamic style
    const style = {};
    if (!fullHeight) {
      style.height = `calc(100% / 24 * ${height})`;
    }

    return (
      <GameContainer>
        <div className={classes} style={style}>
          <div style={{ opacity }}>{nextEl}</div>
          <style jsx>{`
            .inner-container {
              position: absolute;
              width: calc(100% / 16 * ${width});
              background: ${backgroundColor};
            }
          `}</style>
        </div>
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
    openGame: func.isRequired,
    closeGame: func.isRequired,
    broadcastGameAction: func.isRequired
  };

  getChildContext() {
    return {
      openGame: this.handleOpenGame,
      closeGame: this.handleCloseGame,
      broadcastGameAction: this.handleBroadcastGameAction
    };
  }

  handleOpenGame = (gameId: GameId) => {
    console.log('[SOCKET] open-game', gameId);
  };

  handleCloseGame = (gameId: GameId) => {
    console.log('[SOCKET] close-game', gameId);
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
  ViewportContainer,
  createReduxProxy({
    createStore
  }),
  SocketProviderProxy
];
