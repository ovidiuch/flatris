// @flow

import React from 'react';
import PointerButton from '../PointerButton';

type Props = {
  onPress: Function,
  onRelease: Function
};

export default ({ onPress, onRelease }: Props) => (
  <PointerButton onPress={onPress} onRelease={onRelease}>
    <svg viewBox="0 0 24 24">
      <path d="M20 12l-1.41-1.41L13 16.17V4h-2v12.17l-5.58-5.59L4 12l8 8 8-8z" />
    </svg>
  </PointerButton>
);
