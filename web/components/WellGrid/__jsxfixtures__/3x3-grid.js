// @flow

import React from 'react';
import WellGrid from '../../WellGrid';

const grid = [
  [null, [5, '#fbb414'], [6, '#fbb414']],
  [null, [4, '#3993d0'], [7, '#fbb414']],
  [[1, '#3993d0'], [2, '#3993d0'], [3, '#3993d0']]
];

export default <WellGrid grid={grid} blocksCleared={[]} blocksPending={[]} />;
