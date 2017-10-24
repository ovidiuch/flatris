import { STOPPED } from '../../../constants/states';
import FlatrisGame from '../../FlatrisGame.jsx';

export default {
  component: FlatrisGame,

  reduxState: {
    game: {
      gameState: STOPPED,
      score: 0,
      lines: 0
    }
  }
};
