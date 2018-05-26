// @flow

import { createFixture } from '../../../../../utils/create-fixture';
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
