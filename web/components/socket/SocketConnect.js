// @flow

import { func } from 'prop-types';
import React, { Component } from 'react';

import type { ComponentType } from 'react';
import type { JoinGameAction, ThunkAction } from 'shared/types/actions';

type Props = {};

export function withSocket(
  CompType: ComponentType<*>,
  syncActions: {
    [propName: string]: (...args: any) => JoinGameAction | ThunkAction
  } = {}
) {
  class SocketConnect extends Component<Props> {
    static displayName = `SocketConnect(${CompType.displayName ||
      CompType.name ||
      'UnnamedComponent'})`;

    static contextTypes = {
      subscribe: func.isRequired,
      keepGameAlive: func.isRequired,
      broadcastGameAction: func.isRequired,
      onGameKeepAlive: func.isRequired,
      offGameKeepAlive: func.isRequired
    };

    createActionHandler = (actionName: string) => async (...args: any) => {
      const { broadcastGameAction } = this.context;
      const actionCreator = syncActions[actionName];

      // NOTE: This must only run on the client!
      return broadcastGameAction(actionCreator(...args));
    };

    getBoundHandlers() {
      return Object.keys(syncActions).reduce((acc, actionName) => {
        return {
          ...acc,
          [actionName]: this.createActionHandler(actionName)
        };
      }, {});
    }

    render() {
      return (
        <CompType
          {...this.props}
          {...this.context}
          {...this.getBoundHandlers()}
        />
      );
    }
  }

  return SocketConnect;
}
