import { COLORS } from '../../../constants/tetromino';
import Tetromino from '../../Tetromino.jsx';

export default {
  component: Tetromino,

  props: {
    color: COLORS.Z,
    grid: [[0, 1, 0], [1, 1, 0], [1, 0, 0]]
  }
};
