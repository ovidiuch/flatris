// @flow

import WaitingForOther from '../../WaitingForOther';

import { createFixture } from '../../../../utils/create-fixture';
import { getSampleUser } from '../../../../utils/test-helpers';
import { getBlankPlayer } from '../../../../reducers/game';

const user = getSampleUser();
const curPlayer = {
  ...getBlankPlayer('1337', user),
  ping: 1234
};

export default createFixture({
  component: WaitingForOther,

  props: {
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
