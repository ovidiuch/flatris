import { getSampleUser } from '../../../utils/user';
import { getBlankGame } from '../../../reducers/game';
import FlatrisGame from '../../FlatrisGame';

const user = getSampleUser();

export default {
  component: FlatrisGame,

  reduxState: {
    curUser: user,
    game: getBlankGame({ id: 1337, user })
  }
};
