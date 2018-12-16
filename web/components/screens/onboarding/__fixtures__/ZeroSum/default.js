// @flow

import { createFixture } from 'react-cosmos';
import ZeroSum from '../../ZeroSum';

export default createFixture({
  component: ZeroSum,

  props: {
    onNext: () => console.log('Next')
  },

  container: {
    width: 10,
    backgroundColor: 'rgba(236, 240, 241, 0.85)'
  }
});
