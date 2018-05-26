import { SHAPES, COLORS } from 'shared/constants/tetromino';
import Tetromino from '../..//Tetromino';

export default {
  component: Tetromino,

  props: {
    color: COLORS.O,
    grid: SHAPES.O
  }
};
