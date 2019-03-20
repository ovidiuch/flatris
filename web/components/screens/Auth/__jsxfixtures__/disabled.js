// @flow

import React from 'react';
import { FlatrisReduxMock } from '../../../../mocks/ReduxMock';
import Auth from '..';

export default (
  <FlatrisReduxMock initialState={{ jsReady: false }}>
    <Auth onAuth={() => console.log('Auth started...')} />
  </FlatrisReduxMock>
);
