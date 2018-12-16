// @flow

import { createFixture } from 'react-cosmos';
import HowToPlay from '../../HowToPlay';

export default createFixture({
  component: HowToPlay,

  props: {
    disabled: true,
    onNext: () => console.log('Next')
  },

  container: {
    width: 10,
    backgroundColor: 'rgba(236, 240, 241, 0.85)'
  }
});
