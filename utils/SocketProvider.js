// @flow

import { func } from 'prop-types';
import { Component } from 'react';
import { connect } from 'react-redux';
import io from 'socket.io-client';
import { getApiUrl } from '../utils/api';

import type { Node } from 'react';
import type { Action, ThunkAction } from '../types/actions';

type Props = {
  children: Node,
  dispatch: (Action | ThunkAction) => Action
};

let socket;

class SocketProviderInner extends Component<Props> {
  static childContextTypes = {
    broadcast: func.isRequired
  };

  componentDidMount() {
    if (!socket) {
      socket = io(getApiUrl());
    }

    socket.on('message', this.handleMessage);
  }

  getChildContext() {
    return {
      broadcast: this.handleBroadcast
    };
  }

  componentWillUnmount() {
    if (socket) {
      socket.off('message', this.handleMessage);
    }
  }

  handleMessage = msg => {
    // console.log('on message', msg);
    this.props.dispatch(msg);
  };

  handleBroadcast = (action: Action) => {
    const { dispatch } = this.props;

    // The final action is returned from async thunk actions
    const resAction: Action = dispatch(action);

    // console.log('broadcast', resAction);
    socket.emit('message', resAction);

    // Allow callers to chain broadcasted actions
    return resAction;
  };

  render() {
    return this.props.children;
  }
}

// We only need connect to obtain the `dispatch` store method via props
export const SocketProvider = connect()(SocketProviderInner);
