// @flow

import { createFixture } from 'react-cosmos';
import Invite from '../../Invite';

export default createFixture({
  component: Invite,

  props: {
    disabled: true,
    gameId: '1337',
    onPlay: () => console.log('Play')
  },

  container: {
    width: 10,
    backgroundColor: 'rgba(236, 240, 241, 0.85)'
  }
});
