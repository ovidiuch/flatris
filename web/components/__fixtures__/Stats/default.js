// @flow

import { createFixture } from 'react-cosmos';
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
  }
});
