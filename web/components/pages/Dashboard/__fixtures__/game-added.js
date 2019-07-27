// @flow

import React from 'react';
import { getBlankGame } from 'shared/reducers/game';
import {
  getSampleUser,
  useTimeout,
  useAction
} from '../../../../utils/test-helpers';
import { FlatrisReduxMock } from '../../../../mocks/ReduxMock';
import { SocketProviderMock } from '../../../../mocks/SocketProviderMock';
import Dashboard from '..';

const user = getSampleUser();
const game = getBlankGame({ id: 'dce6b11e', user });

function DashboardController() {
  useTimeout(useAction({ type: 'ADD_GAME', payload: { game } }), 200);
  return <Dashboard />;
}

export default (
  <FlatrisReduxMock initialState={{ jsReady: true, games: {} }}>
    <SocketProviderMock>
      <DashboardController />
    </SocketProviderMock>
  </FlatrisReduxMock>
);
