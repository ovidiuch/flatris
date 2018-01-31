// @flow

import { func } from 'prop-types';
import { Component } from 'react';
import { connect } from 'react-redux';
import io from 'socket.io-client';
import { getApiUrl } from '../utils/api';

import type { Node } from 'react';
import type { GameId } from '../types/state';
import type { Action, GameAction, ThunkAction } from '../types/actions';

type Props = {
  children: Node,
  dispatch: (Action | ThunkAction) => Action
};

let socket;

function getSocket() {
  if (!socket) {
    socket = io(getApiUrl());
  }

  return socket;
}

class SocketProviderInner extends Component<Props> {
  static childContextTypes = {
    openGame: func.isRequired,
    closeGame: func.isRequired,
    broadcastGameAction: func.isRequired
  };

  componentDidMount() {
    getSocket().on('game-action', this.handleReceiveGameAction);
  }

  getChildContext() {
    return {
      openGame: this.handleOpenGame,
      closeGame: this.handleCloseGame,
      broadcastGameAction: this.handleBroadcastGameAction
    };
  }

  componentWillUnmount() {
    if (socket) {
      socket.off('game-action', this.handleReceiveGameAction);
    }
  }

  handleOpenGame = (gameId: GameId) => {
    // console.log('[SOCKET] open-game', gameId);
    getSocket().emit('open-game', gameId);
  };

  handleCloseGame = (gameId: GameId) => {
    // console.log('[SOCKET] close-game', gameId);
    getSocket().emit('close-game', gameId);
  };

  handleReceiveGameAction = (action: GameAction) => {
    // console.log('[SOCKET] On game-action', action);
    this.props.dispatch(action);
  };

  handleBroadcastGameAction = (action: Action) => {
    const { dispatch } = this.props;

    // The final action is returned from async thunk actions
    const resAction: Action = dispatch(action);

    // console.log('[SOCKET] Emit game-action', resAction);
    getSocket().emit('game-action', resAction);

    // Allow callers to chain broadcasted actions
    return resAction;
  };

  render() {
    return this.props.children;
  }
}

// We only need connect to obtain the `dispatch` store method via props
export const SocketProvider = connect()(SocketProviderInner);
