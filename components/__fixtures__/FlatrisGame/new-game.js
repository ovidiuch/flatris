// @flow

import { getSampleUser } from '../../../utils/test-helpers';
import { getBlankGame } from '../../../reducers/game';
import FlatrisGame from '../../FlatrisGame';

const user = getSampleUser();
const game = getBlankGame({ id: 'dce6b11e', user });

export default {
  component: FlatrisGame,

  reduxState: {
    jsReady: true,
    curUser: user,
    games: {
      [game.id]: game
    },
    curGame: game.id
  }
};
