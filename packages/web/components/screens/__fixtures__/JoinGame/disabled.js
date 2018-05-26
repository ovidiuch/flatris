// @flow

import { createFixture } from '../../../../utils/create-fixture';
import JoinGame from '../../JoinGame';

export default createFixture({
  component: JoinGame,

  props: {
    disabled: true,
    onWatch: () => console.log('Just watch'),
    onJoin: () => console.log('Join game')
  },

  container: {
    width: 10,
    backgroundColor: 'rgba(236, 240, 241, 0.85)'
  }
});
