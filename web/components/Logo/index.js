// @flow

import React from 'react';
import { SHAPES } from 'shared/constants/tetromino';
import Tetromino from '../Tetromino';

type Props = {
  color?: string
};

export default function Logo({ color = '#34495f' }: Props) {
  return (
    <div className="logo">
      <Tetromino color={color} grid={SHAPES.S} />
      <style jsx>{`
        .logo {
          position: absolute;
          width: 100%;
          height: 100%;
          overflow: hidden;
        }

        .logo :global(.tetromino) {
          width: calc(100% * 4 / 3);
          height: 200%;
        }
      `}</style>
    </div>
  );
}
