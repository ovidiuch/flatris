import { SHAPES } from '../../../constants/tetromino';
import Well from '../../Well';

export default {
  component: Well,

  props: {
    grid: [
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
      [null, [1196, '#b04497'], null, null, null, null, null, null, null, null],
      [
        [1197, '#b04497'],
        [1198, '#b04497'],
        [1199, '#b04497'],
        null,
        null,
        null,
        null,
        null,
        null,
        null
      ]
    ],
    blocksCleared: [],
    blocksPending: [],
    activeTetromino: 'T',
    activeTetrominoGrid: SHAPES.T,
    activeTetrominoPosition: {
      x: 2,
      y: 13.508750000000028
    }
  }
};
