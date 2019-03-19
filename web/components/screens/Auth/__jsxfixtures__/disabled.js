// @flow

import React from 'react';
import { ReduxMock } from '../../../../mocks/ReduxMock';
import Auth from '..';

export default (
  <ReduxMock state={{ jsReady: false }}>
    <Auth onAuth={() => console.log('Auth started...')} />
  </ReduxMock>
);
