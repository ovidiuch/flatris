// @flow

import { createFixture } from '../../../../utils/create-fixture';
import GameFull from '../../GameFull';

export default createFixture({
  component: GameFull,

  props: {
    disabled: false,
    onWatch: () => console.log('Just watch')
  },

  container: {
    width: 10,
    backgroundColor: 'rgba(236, 240, 241, 0.85)'
  }
});
