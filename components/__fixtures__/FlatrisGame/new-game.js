import { getSampleUser } from '../../../utils/user';
import { getBlankGame } from '../../../reducers/game';
import FlatrisGame from '../../FlatrisGame';

export default {
  component: FlatrisGame,

  reduxState: {
    curUser: getSampleUser(),
    game: getBlankGame({ activeTetrimono: 'S', nextTetrimino: 'S' })
  }
};
