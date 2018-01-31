// @flow

import { func } from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import createReduxProxy from 'react-cosmos-redux-proxy';
import FlatrisGame from './components/FlatrisGame';
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
