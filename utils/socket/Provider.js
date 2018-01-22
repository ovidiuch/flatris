// @flow

import { func } from 'prop-types';
import { Component } from 'react';
import { connect } from 'react-redux';
import io from 'socket.io-client';

import type { Node } from 'react';
import type { Action, AsyncAction } from '../../types/actions';

type Props = {
  children?: Node,
  dispatch: (Action | AsyncAction) => Action
};

let socket;

class SocketProviderInner extends Component<Props> {
  static childContextTypes = {
    broadcast: func.isRequired
  };

  componentDidMount() {
    if (!socket) {
      socket = io('http://localhost:4000');
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

  handleBroadcast = async (action: Action) => {
    const { dispatch } = this.props;

    // The final action is returned from async thunk actions
    const resAction: Action = await dispatch(action);

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
