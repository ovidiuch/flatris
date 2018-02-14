// @flow

import { getBlankPlayer } from '../../../reducers/game';
import PlayerInfo from '../../PlayerInfo';

import type { Props } from '../../PlayerInfo';

const user = { id: 'mock', name: 'Treznik' };
const player = {
  ...getBlankPlayer('mock', user),
  status: 'READY',
  score: 1337,
  lines: 30
};

const fixture: { props: Props } = {
  component: PlayerInfo,

  container: {
    width: 4,
    height: 4,
    gameHeight: true
  },

  props: {
    player,
    isPlayer1: true,
    showReadyState: true
  }
};

export default fixture;
