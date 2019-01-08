// @flow

import React from 'react';
import { StateMock } from '@react-mock/state';
import CopyButton from '..';

export default (
  <StateMock state={{ copyStatus: 'error' }}>
    <CopyButton
      disabled={false}
      copyText="I made you copy me!"
      defaultLabel="Copy link"
      successLabel="Link copied!"
      errorLabel="Copy failed :("
    />
  </StateMock>
);
