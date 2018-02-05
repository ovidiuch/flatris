// @flow

import WaitingForOther from '../../WaitingForOther';

import type { Props } from '../../WaitingForOther';

const fixture: { props: Props } = {
  component: WaitingForOther,

  props: {
    onPing: () => console.log(`Ping!`)
  },

  container: {
    width: 10,
    fullHeight: true,
    backgroundColor: 'rgba(236, 240, 241, 0.85)'
  }
};

export default fixture;
