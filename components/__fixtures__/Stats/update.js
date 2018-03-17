// @flow

import { createFixture } from '../../../utils/create-fixture';
import Stats from '../../Stats';

export default createFixture({
  component: Stats,

  props: {
    stats: {
      actionAcc: 78324,
      actionLeft: 89339,
      actionRight: 101170,
      actionRotate: 79418,
      games: 1906,
      lines: 14599,
      seconds: 150275
    }
  },

  state: {
    lastUpdated: Date.now() + 1000,
    statsDiff: {
      actionAcc: 211,
      actionLeft: 155,
      actionRight: 167,
      actionRotate: 123,
      games: 3,
      lines: 51,
      seconds: 35
    }
  }
});
