import { STOPPED } from '../../../constants/states';
import FlatrisStatePreview from '../../FlatrisStatePreview.jsx';

export default {
  component: FlatrisStatePreview,

  reduxState: {
    game: {
      gameState: STOPPED,
      score: 0,
      lines: 0
    }
  }
};
