import { SHAPES, COLORS } from '../../../constants/tetromino';
import Tetromino from '../../Tetromino.jsx';

export default {
  component: Tetromino,

  props: {
    color: COLORS.I,
    grid: SHAPES.I
  }
};
