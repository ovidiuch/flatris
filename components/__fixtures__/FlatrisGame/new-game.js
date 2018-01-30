import { getSampleUser } from '../../../utils/test-helpers';
import { getBlankGame } from '../../../reducers/game';
import FlatrisGame from '../../FlatrisGame';

const user = getSampleUser();
const game = getBlankGame({ id: 1337, user });

export default {
  component: FlatrisGame,

  reduxState: {
    curUser: user,
    curGame: game
  }
};
