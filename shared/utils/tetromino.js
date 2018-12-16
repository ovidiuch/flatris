// @flow

import { str as crc32 } from 'crc-32';
import { SHAPES } from '../constants/tetromino';

import type { Tetromino, Position2d, GameId } from '../types/state';

export function getNextTetromino(gameId: GameId, nth: number): Tetromino {
  // $FlowFixMe
  const tetrominos: Tetromino[] = Object.keys(SHAPES);
  const randNum = crc32(gameId + nth);

  return tetrominos[Math.abs(randNum) % tetrominos.length];
}

export function getInitialPositionForTetromino(
  tetromino: Tetromino,
  gridCols: number
): Position2d {
  /**
   * Generates positions a Tetromino entering the Well. The I Tetromino
   * occupies columns 4, 5, 6 and 7, the O Tetromino occupies columns 5 and
   * 6, and the remaining 5 Tetrominoes occupy columns 4, 5 and 6. Pieces
   * spawn above the visible playfield (that's why y is -2)
   */
  const grid = SHAPES[tetromino];

  return {
    x: Math.round(gridCols / 2) - Math.round(grid[0].length / 2),
    y: -2
  };
}
