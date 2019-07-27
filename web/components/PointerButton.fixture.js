// @flow

import React from 'react';
import PointerButton from './PointerButton';

export default (
  <PointerButton
    onPress={() => console.log('Pressing...')}
    onRelease={() => console.log('...and releasing!')}
  >
    Try me
  </PointerButton>
);
