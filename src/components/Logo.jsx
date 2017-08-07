import React from 'react';
import Tetromino from './Tetromino';
import { SHAPES } from '../constants/tetromino';

import './Logo.css';

const tetromino = 'Z';

export default () =>
  <div className="logo">
    <Tetromino key={tetromino} color="#34495f" grid={SHAPES[tetromino]} />
  </div>;
