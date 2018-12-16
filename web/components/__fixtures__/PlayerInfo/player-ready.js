// @flow

import { createFixture } from 'react-cosmos';
import { getBlankPlayer } from 'shared/reducers/game';
import PlayerInfo from '../../PlayerInfo';

const user = { id: 'mock', name: 'Treznik' };
const player = {
  ...getBlankPlayer('mock', user),
  status: 'READY',
  score: 1337,
  lines: 30
};

export default createFixture({
  component: PlayerInfo,

  container: {
    width: 4,
    height: 4
  },

  props: {
    player,
    wins: 3,
    isPlayer1: true,
    showReadyState: true
  }
});
