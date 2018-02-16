// @flow

import { getSampleUser } from '../../../../utils/test-helpers';
import { getBlankGame, updatePlayer } from '../../../../reducers/game';
import PortraitControls from '../../PortraitControls';

const user = getSampleUser();
let game = getBlankGame({ id: 'dce6b11e', user });
game = updatePlayer(game, user.id, {
  status: 'READY'
});

export default {
  component: PortraitControls,

  container: {},

  reduxState: {
    curUser: user,
    curGame: game
  }
};
