// @flow

import { createFixture } from '../../../utils/create-fixture';
import { getSampleUser, getSampleUser2 } from '../../../utils/test-helpers';
import { getBlankGame } from '../../../reducers/game';
import Dashboard from '../../Dashboard';

const user1 = getSampleUser();
const user2 = getSampleUser2();
const game1 = getBlankGame({ id: 'dce6b11e', user: user1 });
const game2 = getBlankGame({ id: 'dce6b11f', user: user2 });

export default createFixture({
  component: Dashboard,

  reduxState: {
    jsReady: true,
    curUser: user1,
    games: {
      [game1.id]: game1,
      [game2.id]: game2
    }
  }
});
