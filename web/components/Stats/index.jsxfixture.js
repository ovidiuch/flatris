// @flow

import React from 'react';
import { StateMock } from '@react-mock/state';
import Stats from '.';

const statsDiff = {
  actionAcc: [211, Date.now() + 1001],
  actionLeft: [155, Date.now() + 1002],
  actionRight: [167, Date.now() + 1003],
  actionRotate: [123, Date.now() + 1004],
  games: [3, Date.now() + 1005],
  lines: [51, Date.now() + 1006],
  seconds: [35, Date.now() + 1007]
};

export default {
  default: (
    <Stats
      stats={{
        actionAcc: 78324,
        actionLeft: 89339,
        actionRight: 101170,
        actionRotate: 79418,
        games: 1906,
        lines: 14599,
        seconds: 150275
      }}
    />
  ),

  update: (
    <StateMock state={{ statsDiff }}>
      <Stats
        stats={{
          actionAcc: 78324,
          actionLeft: 89339,
          actionRight: 101170,
          actionRotate: 79418,
          games: 1906,
          lines: 14599,
          seconds: 150275
        }}
      />
    </StateMock>
  )
};
