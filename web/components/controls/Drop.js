// @flow

import React from 'react';
import PointerButton from '../PointerButton';

type Props = {
  onPress: Function
};

export default function Drop({ onPress, ...rest }: Props) {
  return (
    <PointerButton
      {...rest}
      bgColor="#fff"
      hoverEffect={false}
      onPress={onPress}
    >
      <svg viewBox="0 0 24 24">
        <path d="M20 12l-1.41-1.41L13 16.17V4h-2v12.17l-5.58-5.59L4 12l8 8 8-8z" />
      </svg>
      <style jsx>{`
        svg {
          fill: #34495f;
          transform: scale(0.6);
        }
        :global(.button:disabled) svg {
          fill: rgba(52, 73, 95, 0.6);
        }
      `}</style>
    </PointerButton>
  );
}
