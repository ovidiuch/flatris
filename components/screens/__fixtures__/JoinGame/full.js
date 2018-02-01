// @flow

import { getSampleUser, getSampleUser2 } from '../../../../utils/test-helpers';
import { getBlankGame, addUserToGame } from '../../../../reducers/game';
import JoinGame from '../../JoinGame';

import type { Props } from '../../JoinGame';

const user1 = getSampleUser();
const user2 = getSampleUser2();
let game = getBlankGame({ id: 'd2f', user: user1 });
game = addUserToGame(game, user2);

const fixture: { props: Props } = {
  component: JoinGame,

  props: {
    game,
    onWatch: () => console.log('Just watch'),
    onJoin: () => console.log('Join game')
  },

  container: {
    width: 10,
    height: 20
  }
};

export default fixture;
