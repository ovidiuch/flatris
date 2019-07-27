// @flow

import React from 'react';
import { COLORS } from 'shared/constants/tetromino';
import SquareBlock from './SquareBlock';

export default {
  'I tetromino': <SquareBlock color={COLORS.I} />,
  'J tetromino': <SquareBlock color={COLORS.J} />,
  'L tetromino': <SquareBlock color={COLORS.L} />,
  'O tetromino': <SquareBlock color={COLORS.O} />,
  'S tetromino': <SquareBlock color={COLORS.S} />,
  'T tetromino': <SquareBlock color={COLORS.T} />,
  'Z tetromino': <SquareBlock color={COLORS.Z} />
};
