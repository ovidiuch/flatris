// @flow

import { getSampleUser } from '../../../utils/test-helpers';
import { getBlankGame } from '../../../reducers/game';
import FlatrisGame from '../../FlatrisGame';

const user = getSampleUser();
const game = getBlankGame({ id: 'dce6b11e', user });

export default {
  component: FlatrisGame,

  container: {
    width: 16,
    height: 24
  },

  reduxState: {
    curUser: user,
    curGame: game
  }
};
