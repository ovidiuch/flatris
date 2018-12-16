// @flow

import WaitingForOther from '../../WaitingForOther';

import { createFixture } from 'react-cosmos';
import { getSampleUser } from '../../../../utils/test-helpers';
import { getBlankPlayer } from 'shared/reducers/game';

const user = getSampleUser();
const curPlayer = getBlankPlayer('1337', user);

export default createFixture({
  component: WaitingForOther,

  props: {
    disabled: true,
    curPlayer,
    onPing: () => console.log(`Ping!`)
  },

  container: {
    width: 10,
    backgroundColor: 'rgba(236, 240, 241, 0.85)'
  }
});
