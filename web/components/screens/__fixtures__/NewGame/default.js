// @flow

import { createFixture } from 'react-cosmos';
import NewGame from '../../NewGame';

export default createFixture({
  component: NewGame,

  props: {
    disabled: false,
    gameId: '1337',
    onPlay: () => console.log(`Play!`)
  },

  container: {
    width: 10,
    backgroundColor: 'rgba(236, 240, 241, 0.85)'
  }
});
