import React from 'react';
import Tetromino from './Tetromino';
import { SHAPES } from '../constants/tetromino';

const tetromino = 'Z';

export default () => (
  <div className="logo">
    <Tetromino key={tetromino} color="#34495f" grid={SHAPES[tetromino]} />
    <style jsx>{`
      .logo {
        position: absolute;
        width: 100%;
        height: 100%;
        background: #fff;
      }

      .logo .tetromino {
        top: 25%;
        left: 12.5%;
      }
    `}</style>
  </div>
);
