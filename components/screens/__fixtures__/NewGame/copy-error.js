// @flow

import { createFixture } from '../../../../utils/create-fixture';
import NewGame from '../../NewGame';

export default createFixture({
  component: NewGame,

  props: {
    gameId: '1337',
    onPlay: () => console.log(`Play!`)
  },

  state: {
    copyStatus: 'error'
  },

  container: {
    width: 10,
    backgroundColor: 'rgba(236, 240, 241, 0.85)'
  }
});
