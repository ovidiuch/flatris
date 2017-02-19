import { WELL_ROWS, WELL_COLS } from './constants/grid';

const { floor, round } = Math;

const SIDE_COLS = 6;
const GAME_COLS = WELL_COLS + SIDE_COLS;

const roundToMultiOf = (value, multiOf) =>
  multiOf === undefined ? value : multiOf * round(value / multiOf);

export default ({ width, height }) => {
  // TODO: Also fit game into viewport width (wide ratios)
  let blockSize = floor(height / (WELL_ROWS + 3));
  let gameWidth = blockSize * GAME_COLS;

  // Make sure the width of the game fits on wide screens
  if (gameWidth > width) {
    blockSize = floor(width / GAME_COLS);
    gameWidth = blockSize * GAME_COLS;
  }

  // Show preview alongside game in landscape mode
  const landscape = width >= gameWidth * 2;

  // Values relative to a block size of 30px
  const getRelSize = (relValue, multiOf = 1) =>
    roundToMultiOf(relValue * (blockSize / 30), multiOf);

  const controls = {
    size: blockSize * 2,
    padding: getRelSize(20)
  };

  return {
    width,
    height,
    blockSize,
    landscape,
    fontSize: {
      default: getRelSize(14, 2),
      text: getRelSize(20, 2),
      button: getRelSize(18, 2),
      control: getRelSize(24),
      title: getRelSize(40, 2),
      count: getRelSize(30, 2)
    },
    root: {
      width: gameWidth,
      height: blockSize * WELL_ROWS + 2 * blockSize + 2 * controls.padding
    },
    well: {
      width: blockSize * WELL_COLS,
      height: blockSize * WELL_ROWS
    },
    side: {
      width: blockSize * SIDE_COLS,
      height: blockSize * WELL_ROWS,
      padding: getRelSize(30)
    },
    controls,
    code: {
      padding: getRelSize(15),
      fontSize: getRelSize(12, 2)
    }
  };
};
