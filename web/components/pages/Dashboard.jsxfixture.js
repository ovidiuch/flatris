// @flow

import React from 'react';
import { getBlankGame } from 'shared/reducers/game';
import { getSampleUser } from '../../utils/test-helpers';
import { ReduxMock } from '../../mocks/ReduxMock';
import { SocketProviderMock } from '../../mocks/SocketProviderMock';
import Dashboard from './Dashboard';

const user = getSampleUser();
const game = getBlankGame({ id: 'dce6b11e', user });

export default (
  <ReduxMock
    state={{
      jsReady: true,
      games: { [game.id]: game }
    }}
  >
    <SocketProviderMock>
      <Dashboard />
    </SocketProviderMock>
  </ReduxMock>
);
