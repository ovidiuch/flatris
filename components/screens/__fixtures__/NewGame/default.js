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
    height: 20
  }
};

export default fixture;
