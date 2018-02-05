// @flow

import GetReady from '../../GetReady';

import type { Props } from '../../GetReady';

const fixture: { props: Props } = {
  component: GetReady,

  props: {
    onReady: () => console.log(`Ready!`)
  },

  container: {
    width: 10,
    fullHeight: true,
    backgroundColor: 'rgba(236, 240, 241, 0.85)'
  }
};

export default fixture;
