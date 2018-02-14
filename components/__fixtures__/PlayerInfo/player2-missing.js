// @flow

import PlayerInfo from '../../PlayerInfo';

import type { Props } from '../../PlayerInfo';

const fixture: { props: Props } = {
  component: PlayerInfo,

  container: {
    width: 4,
    height: 4,
    gameHeight: true
  },

  props: {
    player: null,
    isPlayer1: false,
    showReadyState: false
  }
};

export default fixture;
