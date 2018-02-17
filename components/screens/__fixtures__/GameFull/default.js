// @flow

import GameFull from '../../GameFull';

import type { Props } from '../../GameFull';

const fixture: { props: Props } = {
  component: GameFull,

  props: {
    onWatch: () => console.log('Just watch')
  },

  container: {
    width: 10,
    backgroundColor: 'rgba(236, 240, 241, 0.85)'
  }
};

export default fixture;
