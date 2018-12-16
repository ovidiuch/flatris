// @flow

import React from 'react';
import PointerButton from '../PointerButton';

type Props = {
  onPress: Function
};

export default function Right({ onPress, ...rest }: Props) {
  return (
    <PointerButton
      {...rest}
      bgColor="#fff"
      hoverEffect={false}
      onPress={onPress}
    >
      <svg viewBox="0 0 24 24">
        <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z" />
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
