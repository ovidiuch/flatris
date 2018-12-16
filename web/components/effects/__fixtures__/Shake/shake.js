// @flow

import React from 'react';
import { createFixture } from 'react-cosmos';
import Shake from '../../../effects/Shake';

export default createFixture({
  component: Shake,
  props: {
    children: <div>Shakira, Shakira!</div>,
    time: 1234
  }
});
