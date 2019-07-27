// @flow

import { func } from 'prop-types';
import { Component } from 'react';
import { connect } from 'react-redux';

import type { Node } from 'react';
import type { Action, ThunkAction } from 'shared/types/actions';

type SocketProviderProps = {
  children: Node,
  dispatch: (Action | ThunkAction) => Action
};

class SocketProvider extends Component<SocketProviderProps> {
  static childContextTypes = {
    subscribe: func.isRequired,
    keepGameAlive: func.isRequired,
    broadcastGameAction: func.isRequired,
    onGameKeepAlive: func.isRequired,
    offGameKeepAlive: func.isRequired
  };

  getChildContext() {
    return {
      subscribe: this.handleSubscribe,
      keepGameAlive: this.handleKeepGameAlive,
      broadcastGameAction: this.handleBroadcastGameAction,
      onGameKeepAlive: this.handleOnGameKeepAlive,
      offGameKeepAlive: this.handleOffGameKeepAlive
    };
  }

  handleSubscribe = roomId => {
    console.log('Subscribe', roomId);
  };

  handleKeepGameAlive = gameId => {
    console.log('Keep alive', gameId);
  };

  handleBroadcastGameAction = (action: Action) => {
    const { dispatch } = this.props;

    // The final action is returned from async thunk actions
    dispatch(action);
  };

  handleOnGameKeepAlive = () => {
    console.log('Subscribe to game-keep-alive');
  };

  handleOffGameKeepAlive = () => {
    console.log('Unsubscribe from game-keep-alive');
  };

  render() {
    return this.props.children;
  }
}

export const SocketProviderMock = connect()(SocketProvider);
