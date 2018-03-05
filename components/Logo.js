// @flow

import React from 'react';
import Tetromino from './Tetromino';
import { SHAPES } from '../constants/tetromino';

type Props = {
  color?: string
};

export default ({ color = '#34495f' }: Props) => (
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
