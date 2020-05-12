// @flow

import React from 'react';
import { COLORS } from 'shared/constants/tetromino';
import Button from '.';

export default {
  primary: <Button onClick={() => console.log('onClick')}>Enter</Button>,

  'primary disabled': <Button disabled>Enter</Button>,

  secondary: (
    <Button
      bgColor="#fff"
      color="#34495f"
      colorDisabled="rgba(52, 73, 95, 0.6)"
      onClick={() => console.log('onClick')}
    >
      Watch
    </Button>
  ),

  'secondary disabled': (
    <Button
      disabled
      bgColor="#fff"
      color="#34495f"
      colorDisabled="rgba(52, 73, 95, 0.6)"
    >
      Watch
    </Button>
  ),

  'feedback form': (
    <Button bgColor={COLORS.T} onClick={() => console.log('onClick')}>
      Form
    </Button>
  )
};
