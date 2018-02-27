// @flow

import { func } from 'prop-types';
import React, { Component } from 'react';

import type { ComponentType } from 'react';
import type { Action, ThunkAction } from '../../types/actions';

type Props = {};

export function withSocket(
  CompType: ComponentType<*>,
  syncActions: {
    [propName: string]: (...args: any) => Action | ThunkAction
  } = {}
) {
  class SocketConnect extends Component<Props> {
    static displayName = `SocketConnect(${CompType.displayName ||
      CompType.name})`;

    static contextTypes = {
      subscribe: func.isRequired,
      broadcastGameAction: func.isRequired
    };

    createActionHandler = (actionName: string) => async (...args: any) => {
      const { broadcastGameAction } = this.context;
      const actionCreator = syncActions[actionName];

      // NOTE: This must only run on the client!
      return broadcastGameAction(actionCreator(...args));
    };

    render() {
      const { subscribe } = this.context;
      const actions = Object.keys(syncActions).reduce(
        (acc, actionName) => {
          return {
            ...acc,
            [actionName]: this.createActionHandler(actionName)
          };
        },
        { subscribe }
      );

      return <CompType {...this.props} {...actions} />;
    }
  }

  return SocketConnect;
}
