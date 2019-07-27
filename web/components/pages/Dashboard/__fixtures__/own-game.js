// @flow

import React from 'react';
import { getBlankGame } from 'shared/reducers/game';
import { getSampleUser } from '../../../../utils/test-helpers';
import { FlatrisReduxMock } from '../../../../mocks/ReduxMock';
import { SocketProviderMock } from '../../../../mocks/SocketProviderMock';
import Dashboard from '..';

const user = getSampleUser();
const game = getBlankGame({ id: 'dce6b11e', user });

export default (
  <FlatrisReduxMock
    initialState={{
      jsReady: true,
      curUser: user,
      games: { [game.id]: game }
    }}
  >
    <SocketProviderMock>
      <Dashboard />
    </SocketProviderMock>
  </FlatrisReduxMock>
);
