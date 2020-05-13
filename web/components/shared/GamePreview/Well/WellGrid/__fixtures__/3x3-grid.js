// @flow

import React from 'react';
import { GameContainerMock } from '../../../../../../mocks/GameContainerMock';
import WellGrid from '..';

const grid = [
  [null, [5, '#fbb414'], [6, '#fbb414']],
  [null, [4, '#3993d0'], [7, '#fbb414']],
  [
    [1, '#3993d0'],
    [2, '#3993d0'],
    [3, '#3993d0']
  ]
];

export default (
  <GameContainerMock cols={6} rows={6}>
    <WellGrid grid={grid} blocksCleared={[]} blocksPending={[]} />
  </GameContainerMock>
);
