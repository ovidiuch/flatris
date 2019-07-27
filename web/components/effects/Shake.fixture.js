// @flow

import React from 'react';
import Shake from './Shake';

export default {
  shake: (
    <Shake time={1234}>
      <div>Shakira, Shakira!</div>
    </Shake>
  ),

  still: (
    <Shake time={null}>
      <em>Crickets ♪</em>
    </Shake>
  )
};
