// @flow

import React from 'react';
import { ReduxProviderMock } from '../../mocks/ReduxProviderMock';
import { SocketProviderMock } from '../../mocks/SocketProviderMock';
import NewGame from './NewGame';

// NOTE: An authenticated fixture for NewGame does not exist because it would
// automatically redirect to /join page
export default (
  <ReduxProviderMock
    state={{
      jsReady: true
    }}
  >
    <SocketProviderMock>
      <NewGame />
    </SocketProviderMock>
  </ReduxProviderMock>
);
