// @flow

import { createFixture } from '../../../utils/create-fixture';
import { getSampleUser } from '../../../utils/test-helpers';
import { getBlankGame } from '../../../reducers/game';
import Dashboard from '../../Dashboard';

const user = getSampleUser();
const game = getBlankGame({ id: 'dce6b11e', user });

export default createFixture({
  component: Dashboard,

  reduxState: {
    jsReady: true,
    games: { [game.id]: game }
  }
});
