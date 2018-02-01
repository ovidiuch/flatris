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
    height: 20
  }
};

export default fixture;
