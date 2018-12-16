// @flow

import React from 'react';
import PointerButton from '../PointerButton';

type Props = {
  onPress: Function
};

export default function Left({ onPress, ...rest }: Props) {
  return (
    <PointerButton
      {...rest}
      bgColor="#fff"
      hoverEffect={false}
      onPress={onPress}
    >
      <svg viewBox="0 0 24 24">
        <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" />
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
