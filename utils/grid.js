// @flow

import type { Grid, WallGrid, TetrominoGrid, Position2d } from '../types/state';

export function generateEmptyGrid(rows: number, cols: number): WallGrid {
  const matrix = [];

  for (let row = 0; row < rows; row++) {
    matrix[row] = [];
    for (let col = 0; col < cols; col++) {
      matrix[row][col] = null;
    }
  }

  return matrix;
}

export function rotate<GridItem>(grid: Grid<GridItem>): Grid<GridItem> {
  const matrix = [];
  const rows = grid.length;
  const cols = grid[0].length;

  for (let row = 0; row < rows; row++) {
    matrix[row] = [];
    for (let col = 0; col < cols; col++) {
      matrix[row][col] = grid[cols - 1 - col][row];
    }
  }

  return matrix;
}

export function getExactPosition({ x, y }: Position2d) {
  // The position has floating numbers because of how gravity is incremented
  // with each frame
  return {
    x: Math.floor(x),
    y: Math.floor(y)
  };
}

export function isPositionAvailable(
  grid: WallGrid,
  tetrominoGrid: TetrominoGrid,
  position: Position2d
): boolean {
  const rows = grid.length;
  const cols = grid[0].length;
  const tetrominoRows = tetrominoGrid.length;
  const tetrominoCols = tetrominoGrid[0].length;
  const tetrominoPositionInGrid = getExactPosition(position);
  let relativeRow;
  let relativeCol;

  for (let row = 0; row < tetrominoRows; row++) {
    for (let col = 0; col < tetrominoCols; col++) {
      // Ignore blank squares from the Tetromino grid
      if (tetrominoGrid[row][col]) {
        relativeRow = tetrominoPositionInGrid.y + row;
        relativeCol = tetrominoPositionInGrid.x + col;

        // Ensure Tetromino block is within the horizontal bounds
        if (relativeCol < 0 || relativeCol >= cols) {
          return false;
        }

        // Check check if Tetromino hit the bottom of the Well
        if (relativeRow >= rows) {
          return false;
        }

        // Tetrominoes are accepted on top of the Well (it's how they enter)
        if (relativeRow >= 0) {
          // Then if the position is not already taken inside the grid
          if (grid[relativeRow][relativeCol]) {
            return false;
          }
        }
      }
    }
  }

  return true;
}

export function getBottomMostPosition(
  grid: WallGrid,
  tetrominoGrid: TetrominoGrid,
  position: Position2d
): Position2d {
  // Snap vertical position to grid
  let y = Math.floor(position.y);

  while (!isPositionAvailable(grid, tetrominoGrid, { x: position.x, y })) {
    y -= 1;
  }

  return Object.assign({}, position, { y });
}

const getMaxIdFromLine = line =>
  Math.max(...line.map(cell => (cell ? cell[0] : 0)));

const getMaxIdFromGrid = grid =>
  Math.max(...grid.map(line => getMaxIdFromLine(line)));

export function transferTetrominoToGrid(
  grid: WallGrid,
  tetrominoGrid: TetrominoGrid,
  position: Position2d,
  color: string
): WallGrid {
  const rows = tetrominoGrid.length;
  const cols = tetrominoGrid[0].length;
  const tetrominoPositionInGrid = getExactPosition(position);
  const newGrid = grid.map(l => l.map(c => c));
  let relativeRow;
  let relativeCol;
  let cellId = getMaxIdFromGrid(newGrid);

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      // Ignore blank squares from the Tetromino grid
      if (tetrominoGrid[row][col]) {
        relativeCol = tetrominoPositionInGrid.x + col;
        relativeRow = tetrominoPositionInGrid.y + row;

        // When the Well is full the Tetromino will land before it enters the
        // top of the Well
        if (newGrid[relativeRow]) {
          newGrid[relativeRow][relativeCol] = [++cellId, color];
        }
      }
    }
  }

  return newGrid;
}

const createEmptyLine = cols => [...Array(cols)].map(() => null);

const isLine = row => !row.some(cell => cell === null);

export function clearLines(
  grid: WallGrid
): {
  clearedGrid: WallGrid,
  linesCleared: number
} {
  /**
   * Clear all rows that form a complete line, from one left to right, inside
   * the Well grid. Gravity is applied to fill in the cleared lines with the
   * ones above, thus freeing up the Well for more Tetrominoes to enter.
   */
  const rows = grid.length;
  const cols = grid[0].length;
  const clearedGrid = grid.map(l => l);
  let linesCleared = 0;

  for (let row = rows - 1; row >= 0; row--) {
    if (isLine(clearedGrid[row])) {
      for (let row2 = row; row2 >= 0; row2--) {
        clearedGrid[row2] =
          row2 > 0 ? clearedGrid[row2 - 1] : createEmptyLine(cols);
      }

      linesCleared++;

      // Go once more through the same row
      row++;
    }
  }

  return {
    clearedGrid,
    linesCleared
  };
}

export function fitTetrominoPositionInWellBounds(
  grid: WallGrid,
  tetrominoGrid: TetrominoGrid,
  { x, y }: Position2d
) {
  const cols = grid[0].length;
  const tetrominoRows = tetrominoGrid.length;
  const tetrominoCols = tetrominoGrid[0].length;
  let newX = x;
  let relativeCol;

  for (let row = 0; row < tetrominoRows; row++) {
    for (let col = 0; col < tetrominoCols; col++) {
      // Ignore blank squares from the Tetromino grid
      if (tetrominoGrid[row][col]) {
        relativeCol = newX + col;

        // Wall kick: A Tetromino grid that steps outside of the Well grid will
        // be shifted slightly to slide back inside the Well grid
        if (relativeCol < 0) {
          newX -= relativeCol;
        } else if (relativeCol >= cols) {
          newX -= relativeCol - cols + 1;
        }
      }
    }
  }

  return {
    x: newX,
    y
  };
}
