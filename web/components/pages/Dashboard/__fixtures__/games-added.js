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
const game1 = getBlankGame({ id: 'dce6b11e', user });
const game2 = getBlankGame({ id: 'dce6b110', user });
const game3 = getBlankGame({ id: 'dce6b11b', user });

function DashboardController() {
  useTimeout(useAction({ type: 'ADD_GAME', payload: { game: game1 } }), 200);
  useTimeout(useAction({ type: 'ADD_GAME', payload: { game: game2 } }), 400);
  useTimeout(useAction({ type: 'ADD_GAME', payload: { game: game3 } }), 600);
  return <Dashboard />;
}

export default (
  <FlatrisReduxMock initialState={{ jsReady: true, games: {} }}>
    <SocketProviderMock>
      <DashboardController />
    </SocketProviderMock>
  </FlatrisReduxMock>
);
