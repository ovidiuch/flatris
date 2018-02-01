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
    height: 20
  }
};

export default fixture;
