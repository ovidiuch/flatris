// @flow

import { createFixture } from '../../../utils/create-fixture';
import PlayerInfo from '../../PlayerInfo';

export default createFixture({
  component: PlayerInfo,

  container: {
    width: 4,
    height: 4,
    gameHeight: true
  },

  props: {
    player: null,
    wins: null,
    isPlayer1: true,
    showReadyState: false
  }
});
