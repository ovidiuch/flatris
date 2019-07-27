// @flow

import React from 'react';
import { Viewport } from 'react-cosmos/fixture';
import FlatrisGame from '.';

export default {
  Fullscreen: <FlatrisGame />,

  'iPhone 5': (
    <Viewport width={320} height={568}>
      <FlatrisGame />
    </Viewport>
  ),

  'iPhone 6 Plus': (
    <Viewport width={414} height={736}>
      <FlatrisGame />
    </Viewport>
  ),

  Medium: (
    <Viewport width={1024} height={768}>
      <FlatrisGame />
    </Viewport>
  )
};
