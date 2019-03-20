// @flow

import React from 'react';
import { FlatrisReduxMock } from '../../mocks/ReduxMock';
import { SocketProviderMock } from '../../mocks/SocketProviderMock';
import NewGame from './NewGame';

// NOTE: An authenticated fixture for NewGame does not exist because it would
// automatically redirect to /join page
export default (
  <FlatrisReduxMock
    initialState={{
      jsReady: true
    }}
  >
    <SocketProviderMock>
      <NewGame />
    </SocketProviderMock>
  </FlatrisReduxMock>
);
