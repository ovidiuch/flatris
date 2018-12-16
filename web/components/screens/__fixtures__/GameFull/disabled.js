// @flow

import { createFixture } from 'react-cosmos';
import GameFull from '../../GameFull';

export default createFixture({
  component: GameFull,

  props: {
    disabled: true,
    onWatch: () => console.log('Just watch')
  },

  container: {
    width: 10,
    backgroundColor: 'rgba(236, 240, 241, 0.85)'
  }
});
