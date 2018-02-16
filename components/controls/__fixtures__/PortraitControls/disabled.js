// @flow

import { getSampleUser } from '../../../../utils/test-helpers';
import { getBlankGame } from '../../../../reducers/game';
import PortraitControls from '../../PortraitControls';

const user = getSampleUser();
const game = getBlankGame({ id: 'dce6b11e', user });

export default {
  component: PortraitControls,

  container: {},

  reduxState: {
    curUser: user,
    curGame: game
  }
};
