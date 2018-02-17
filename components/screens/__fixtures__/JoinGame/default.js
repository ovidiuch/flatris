// @flow

import JoinGame from '../../JoinGame';

import type { Props } from '../../JoinGame';

const fixture: { props: Props } = {
  component: JoinGame,

  props: {
    onWatch: () => console.log('Just watch'),
    onJoin: () => console.log('Join game')
  },

  container: {
    width: 10,
    backgroundColor: 'rgba(236, 240, 241, 0.85)'
  }
};

export default fixture;
