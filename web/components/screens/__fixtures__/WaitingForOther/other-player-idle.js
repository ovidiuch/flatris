// @flow

import WaitingForOther from '../../WaitingForOther';

import { createFixture } from 'react-cosmos';
import { getSampleUser } from '../../../../utils/test-helpers';
import { getBlankPlayer } from 'shared/reducers/game';

const user = getSampleUser();
const curPlayer = {
  ...getBlankPlayer('1337', user),
  ping: 1234
};

export default createFixture({
  component: WaitingForOther,

  props: {
    disabled: false,
    curPlayer,
    onPing: () => console.log(`Ping!`)
  },

  state: {
    isOtherPlayerIdle: true
  },

  container: {
    width: 10,
    backgroundColor: 'rgba(236, 240, 241, 0.85)'
  }
});
