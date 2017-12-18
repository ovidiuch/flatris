import { getBlankGame } from '../../../reducers/game';
import FlatrisGame from '../../FlatrisGame';

export default {
  component: FlatrisGame,

  reduxState: {
    game: getBlankGame('S', 'S'),
    userId: 0
  }
};
