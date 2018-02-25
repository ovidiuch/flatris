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
  }
) {
  class SocketConnect extends Component<Props> {
    static displayName = `SocketConnect(${CompType.displayName ||
      CompType.name})`;

    static contextTypes = {
      openGame: func.isRequired,
      closeGame: func.isRequired,
      broadcastGameAction: func.isRequired
    };

    createActionHandler = (actionName: string) => async (...args: any) => {
      const { broadcastGameAction } = this.context;
      const actionCreator = syncActions[actionName];

      // NOTE: This must only run on the client!
      return broadcastGameAction(actionCreator(...args));
    };

    render() {
      const { openGame, closeGame } = this.context;
      const actions = {
        openGame,
        closeGame
      };

      Object.keys(syncActions).forEach(actionName => {
        actions[actionName] = this.createActionHandler(actionName);
      });

      return <CompType {...this.props} {...actions} />;
    }
  }

  return SocketConnect;
}
