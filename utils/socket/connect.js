// @flow

import { func } from 'prop-types';
import React, { Component } from 'react';

import type { ComponentType } from 'react';
import type { Action, AsyncAction } from '../../types/actions';

type Props = {};

export function withSocket(
  CompType: ComponentType<*>,
  syncActions: {
    [propName: string]: (...args: any) => Action | AsyncAction
  }
) {
  class SocketConnect extends Component<Props> {
    static displayName = `SocketConnect(${CompType.displayName ||
      CompType.name})`;

    static contextTypes = {
      broadcast: func.isRequired
    };

    createActionHandler = (actionName: string) => async (...args: any) => {
      const { broadcast } = this.context;
      const actionCreator = syncActions[actionName];

      // NOTE: This must only run on the client!
      return broadcast(actionCreator(...args));
    };

    render() {
      const actions = {};
      Object.keys(syncActions).forEach(actionName => {
        actions[actionName] = this.createActionHandler(actionName);
      });

      return <CompType {...this.props} {...actions} />;
    }
  }

  return SocketConnect;
}
