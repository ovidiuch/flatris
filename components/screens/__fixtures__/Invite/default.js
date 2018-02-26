// @flow

import { createFixture } from '../../../../utils/create-fixture';
import Invite from '../../Invite';

export default createFixture({
  component: Invite,

  props: {
    disabled: false,
    gameId: '1337',
    onPlay: () => console.log('Play')
  },

  container: {
    width: 10,
    backgroundColor: 'rgba(236, 240, 241, 0.85)'
  }
});
