// @flow

import { createFixture } from 'react-cosmos';
import PlayerInfo from '../../PlayerInfo';

export default createFixture({
  component: PlayerInfo,

  container: {
    width: 4,
    height: 4
  },

  props: {
    player: null,
    wins: null,
    isPlayer1: true,
    showReadyState: false
  }
});
