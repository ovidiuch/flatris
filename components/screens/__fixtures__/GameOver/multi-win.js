// @flow

import { getSampleUser, getSampleUser2 } from '../../../../utils/test-helpers';
import {
  getBlankGame,
  addUserToGame,
  updatePlayer
} from '../../../../reducers/game';
import GameOver from '../../GameOver';

import type { Props } from '../../GameOver';

const user1 = getSampleUser();
const user2 = getSampleUser2();
let game = getBlankGame({ id: 'd2f', user: user1 });
game = addUserToGame(game, user2);
game = updatePlayer(game, user1.id, {
  status: 'WON'
});
game = updatePlayer(game, user2.id, {
  status: 'LOST'
});

const fixture: { props: Props } = {
  component: GameOver,

  props: {
    curUser: user1,
    game,
    onRestart: () => console.log(`Restart!`)
  },

  container: {
    width: 10,
    fullHeight: true,
    backgroundColor: 'rgba(236, 240, 241, 0.85)'
  }
};

export default fixture;
