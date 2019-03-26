// @flow

import React from 'react';
import { SHAPES, COLORS } from 'shared/constants/tetromino';
import Tetromino from '.';

export default {
  'I shape': <Tetromino color={COLORS.I} grid={SHAPES.I} />,
  'J shape': <Tetromino color={COLORS.J} grid={SHAPES.J} />,
  'L shape': <Tetromino color={COLORS.L} grid={SHAPES.L} />,
  'O shape': <Tetromino color={COLORS.O} grid={SHAPES.O} />,
  'S shape': <Tetromino color={COLORS.S} grid={SHAPES.S} />,
  'T shape': <Tetromino color={COLORS.T} grid={SHAPES.T} />,
  'Z shape': <Tetromino color={COLORS.Z} grid={SHAPES.Z} />,
  'Z shape rotated 1': (
    <Tetromino color={COLORS.Z} grid={[[0, 0, 1], [0, 1, 1], [0, 1, 0]]} />
  ),
  'Z shape rotated 2': (
    <Tetromino color={COLORS.Z} grid={[[0, 0, 0], [1, 1, 0], [0, 1, 1]]} />
  ),
  'Z shape rotated 3': (
    <Tetromino color={COLORS.Z} grid={[[0, 1, 0], [1, 1, 0], [1, 0, 0]]} />
  )
};
