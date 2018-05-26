// @flow

import { getSampleUser } from '../../../../utils/test-helpers';
import { getBlankGame, updatePlayer } from 'shared/reducers/game';
import LandscapeControls from '../../LandscapeControls';

const user = getSampleUser();
let game = getBlankGame({ id: 'dce6b11e', user });
game = updatePlayer(game, user.id, {
  status: 'READY'
});

export default {
  component: LandscapeControls,

  container: {},

  reduxState: {
    jsReady: true,
    curUser: user,
    games: {
      [game.id]: game
    },
    curGame: game.id
  }
};
