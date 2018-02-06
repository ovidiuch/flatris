// @flow

import NewGame from '../../NewGame';

import type { Props } from '../../NewGame';

const fixture: { props: Props } = {
  component: NewGame,

  props: {
    onPlay: () => console.log(`Play!`)
  },

  container: {
    width: 10,
    gameHeight: true,
    backgroundColor: 'rgba(236, 240, 241, 0.85)'
  }
};

export default fixture;
