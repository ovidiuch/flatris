// @flow

import React from 'react';
import { FlatrisReduxMock } from '../../../mocks/ReduxMock';
import Auth from '.';

export default {
  default: (
    <FlatrisReduxMock initialState={{ jsReady: true }}>
      <Auth onAuth={() => console.log('Auth started...')} />
    </FlatrisReduxMock>
  ),

  disabled: (
    <FlatrisReduxMock initialState={{ jsReady: false }}>
      <Auth onAuth={() => console.log('Auth started...')} />
    </FlatrisReduxMock>
  )
};
