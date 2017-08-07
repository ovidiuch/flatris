import { STOPPED, PLAYING, PAUSED } from '../constants/states';
import {
  WELL_ROWS,
  WELL_COLS,
  DROP_FRAMES_DEFAULT,
  DROP_FRAMES_DECREMENT,
  LINE_CLEAR_BONUSES
} from '../constants/grid';
import { SHAPES, COLORS } from '../constants/tetromino';
import {
  getRandomTetromino,
  getInitialPositionForTetromino
} from '../lib/tetromino';
import {
  generateEmptyGrid,
  rotate,
  isPositionAvailable,
  getBottomMostPosition,
  transferTetrominoToGrid,
  clearLines,
  fitTetrominoPositionInWellBounds
} from '../lib/grid';
import newGame from '../components/__fixtures__/FlatrisGame/new-game';

const reducers = {
  ADVANCE: (state, action) => {
    const {
      score,
      lines,
      nextTetromino,
      grid,
      activeTetromino,
      activeTetrominoGrid,
      activeTetrominoPosition,
      dropAcceleration,
      dropFrames
    } = state;
    const { rows } = action.payload;

    let newPosition = Object.assign({}, activeTetrominoPosition, {
      y: activeTetrominoPosition.y + rows
    });

    // The active Tetromino keeps falling down until it hits something
    if (isPositionAvailable(grid, activeTetrominoGrid, newPosition)) {
      return Object.assign({}, state, {
        activeTetrominoPosition: newPosition
      });
    }

    // A big frame skip could cause the Tetromino to jump more than one row.
    // We need to ensure it ends up in the bottom-most one in case the jump
    // caused the Tetromino to land
    newPosition = getBottomMostPosition(grid, activeTetrominoGrid, newPosition);

    // This is when the active Tetromino hits the bottom of the Well and can
    // no longer be controlled
    const newGrid = transferTetrominoToGrid(
      grid,
      activeTetrominoGrid,
      newPosition,
      COLORS[activeTetromino]
    );

    // Clear lines created after landing and transfering a Tetromino
    const { clearedGrid, linesCleared } = clearLines(newGrid);

    // TODO: Calculate cells in Tetromino. All current Tetrominoes have 4 cells
    const cells = 4;

    // Rudimentary scoring logic, no T-Spin and combo bonuses. Read more at
    // http://tetris.wikia.com/wiki/Scoring
    let points = dropAcceleration ? cells * 2 : cells;
    if (linesCleared) {
      points += LINE_CLEAR_BONUSES[linesCleared - 1] * (lines + 1);
    }

    // Game over when well is full& and it should stop inserting any new
    // Tetrominoes from this point on (until the Well is reset)
    const gameState = newPosition.y < 0 ? STOPPED : PLAYING;

    return Object.assign({}, state, {
      gameState,
      score: score + points,
      lines: lines + linesCleared,
      nextTetromino: getRandomTetromino(),
      grid: clearedGrid,
      activeTetromino: nextTetromino,
      activeTetrominoGrid: SHAPES[nextTetromino],
      activeTetrominoPosition: getInitialPositionForTetromino(
        nextTetromino,
        WELL_COLS
      ),
      // Increase speed whenever a line is cleared (fast game)
      dropFrames: linesCleared ? dropFrames - DROP_FRAMES_DECREMENT : dropFrames
    });
  },

  START: state => {
    const nextTetromino = getRandomTetromino();
    const activeTetromino = getRandomTetromino();
    const activeTetrominoGrid = SHAPES[activeTetromino];
    const activeTetrominoPosition = getInitialPositionForTetromino(
      activeTetromino,
      WELL_COLS
    );

    return Object.assign({}, state, {
      gameState: PLAYING,
      score: 0,
      lines: 0,
      nextTetromino,
      grid: generateEmptyGrid(WELL_ROWS, WELL_COLS),
      activeTetromino,
      activeTetrominoGrid,
      activeTetrominoPosition,
      dropFrames: DROP_FRAMES_DEFAULT,
      dropAcceleration: false
    });
  },

  PAUSE: state =>
    Object.assign({}, state, {
      gameState: PAUSED
    }),

  RESUME: state =>
    Object.assign({}, state, {
      gameState: PLAYING
    }),

  MOVE: (state, action) => {
    const { grid, activeTetrominoGrid, activeTetrominoPosition } = state;
    const { direction } = action.payload;

    const newPosition = Object.assign({}, activeTetrominoPosition, {
      x: activeTetrominoPosition.x + direction
    });

    // Attempting to move the Tetromino outside the Well bounds or over landed
    // Tetrominoes will be ignored
    if (!isPositionAvailable(grid, activeTetrominoGrid, newPosition)) {
      return state;
    }

    return Object.assign({}, state, {
      activeTetrominoPosition: newPosition
    });
  },

  ROTATE: state => {
    const { grid, activeTetrominoGrid, activeTetrominoPosition } = state;

    const newGrid = rotate(activeTetrominoGrid);

    // If the rotation causes the active Tetromino to go outside of the
    // Well bounds, its position will be adjusted to fit inside
    const newPosition = fitTetrominoPositionInWellBounds(
      grid,
      newGrid,
      activeTetrominoPosition
    );

    // If the rotation causes a collision with landed Tetrominoes than it won't
    // be applied
    if (!isPositionAvailable(grid, newGrid, newPosition)) {
      return state;
    }

    return Object.assign({}, state, {
      activeTetrominoGrid: newGrid,
      activeTetrominoPosition: newPosition
    });
  },

  ENABLE_ACCELERATION: state =>
    Object.assign({}, state, {
      dropAcceleration: true
    }),

  DISABLE_ACCELERATION: state =>
    Object.assign({}, state, {
      dropAcceleration: false
    })
};

export default (state, action) => {
  if (typeof state === 'undefined') {
    return newGame.reduxState.game;
  }

  return action.type in reducers ? reducers[action.type](state, action) : state;
};
