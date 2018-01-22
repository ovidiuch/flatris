import { getSampleUser } from '../../../utils/user';
import { getBlankGame } from '../../../reducers/game';
import FlatrisGame from '../../FlatrisGame';

const user = getSampleUser();

export default {
  component: FlatrisGame,

  props: {
    curUser: user,
    game: getBlankGame({ id: 1337, user })
  },

  // We need to the Redux context
  reduxState: {}
};
