// @flow

import React from 'react';
import PointerButton from '../PointerButton';

type Props = {
  onPress: Function
};

export default ({ onPress }: Props) => (
  <PointerButton onPress={onPress}>
    <svg viewBox="0 0 24 24">
      <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z" />
    </svg>
  </PointerButton>
);
