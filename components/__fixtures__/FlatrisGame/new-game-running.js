import { PLAYING } from '../../../constants/states';
import {
  WELL_ROWS,
  WELL_COLS,
  DROP_FRAMES_DEFAULT
} from '../../../constants/grid';
import { SHAPES } from '../../../constants/tetromino';
import { generateEmptyGrid } from '../../../utils/grid';
import FlatrisGame from '../../FlatrisGame';

export default {
  component: FlatrisGame,

  reduxState: {
    game: {
      gameState: PLAYING,
      score: 0,
      lines: 0,
      nextTetromino: 'I',
      grid: generateEmptyGrid(WELL_ROWS, WELL_COLS),
      activeTetromino: 'J',
      activeTetrominoGrid: SHAPES.J,
      activeTetrominoPosition: { x: 4, y: -2 },
      dropFrames: DROP_FRAMES_DEFAULT,
      dropAcceleration: false
    }
  }
};
