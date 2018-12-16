// @flow

import { createFixture } from 'react-cosmos';
import { getSampleUser } from '../../../../utils/test-helpers';
import { getBlankPlayer } from 'shared/reducers/game';
import GetReady from '../../GetReady';

const user = getSampleUser();
const otherPlayer = getBlankPlayer('1337', user);

export default createFixture({
  component: GetReady,

  props: {
    disabled: false,
    otherPlayer,
    onReady: () => console.log(`Ready!`)
  },

  container: {
    width: 10,
    backgroundColor: 'rgba(236, 240, 241, 0.85)'
  }
});
