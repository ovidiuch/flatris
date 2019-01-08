// @flow

import React from 'react';
import { SHAPES } from 'shared/constants/tetromino';
import { GameContainerMock } from '../../../mocks/GameContainerMock';
import Well from '..';

const grid = [
  [null, null, null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null, null, null],
  [null, [1196, '#b04497'], null, null, null, null, null, null, null, null],
  [
    [1197, '#b04497'],
    [1198, '#b04497'],
    [1199, '#b04497'],
    null,
    null,
    null,
    null,
    null,
    null,
    null
  ]
];

export default (
  <GameContainerMock cols={10}>
    <Well
      grid={grid}
      blocksCleared={[]}
      blocksPending={[]}
      activeTetromino="T"
      activeTetrominoGrid={SHAPES.T}
      activeTetrominoPosition={{ x: 2, y: 13.508750000000028 }}
    />
  </GameContainerMock>
);
