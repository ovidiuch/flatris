// @flow

import React from 'react';
import { COLORS } from 'shared/constants/tetromino';
import Button from '.';

export default {
  primary: (
    <Button onClick={() => console.log('Yay! Button clicked-ed!')}>
      Press or be pressed
    </Button>
  ),

  'primary disabled': <Button disabled>No chance amigo</Button>,

  secondary: (
    <Button
      bgColor="#fff"
      color="#34495f"
      colorDisabled="rgba(52, 73, 95, 0.6)"
      onClick={() => console.log('Yay! Button clicked-ed!')}
    >
      Press me will you
    </Button>
  ),

  'secondary disabled': (
    <Button
      disabled
      bgColor="#fff"
      color="#34495f"
      colorDisabled="rgba(52, 73, 95, 0.6)"
    >
      Press me will you
    </Button>
  ),

  'feedback form': (
    <Button
      bgColor={COLORS.T}
      onClick={() => console.log('Yay! Button clicked-ed!')}
    >
      Help make Flatris better
    </Button>
  )
};
