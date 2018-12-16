// @flow

import type {
  Grid,
  WellGrid,
  TetrominoGrid,
  Position2d,
  Player
} from '../types/state';

export function generateEmptyGrid(rows: number, cols: number): WellGrid {
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
  grid: WellGrid,
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
  grid: WellGrid,
  tetrominoGrid: TetrominoGrid,
  position: Position2d
): Position2d {
  // Snap vertical position to grid
  let y = Math.floor(position.y);

  while (!isPositionAvailable(grid, tetrominoGrid, { x: position.x, y })) {
    y -= 1;
  }

  return { ...position, y };
}

export function transferTetrominoToGrid(
  player: Player,
  tetrominoGrid: TetrominoGrid,
  position: Position2d,
  color: string
): WellGrid {
  const { grid } = player;
  const rows = tetrominoGrid.length;
  const cols = tetrominoGrid[0].length;
  const tetrominoPositionInGrid = getExactPosition(position);
  const newGrid = grid.map(l => l.map(c => c));
  let relativeRow;
  let relativeCol;
  let nextCellId = getNextCellId(player);

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      // Ignore blank squares from the Tetromino grid
      if (tetrominoGrid[row][col]) {
        relativeCol = tetrominoPositionInGrid.x + col;
        relativeRow = tetrominoPositionInGrid.y + row;

        // When the Well is full the Tetromino will land before it enters the
        // top of the Well, so we need to protect against negative row indexes
        if (newGrid[relativeRow]) {
          newGrid[relativeRow][relativeCol] = [nextCellId++, color];
        }
      }
    }
  }

  return newGrid;
}

const createEmptyLine = cols => [...Array(cols)].map(() => null);

const isLine = row => !row.some(cell => cell === null);

export function hasLines(well: WellGrid): boolean {
  return well.reduce((acc, rowBlocks) => acc || isLine(rowBlocks), false);
}

export function clearLines(
  grid: WellGrid
): {
  clearedGrid: WellGrid,
  rowsCleared: Array<number>
} {
  /**
   * Clear all rows that form a complete line, from one left to right, inside
   * the Well grid. Gravity is applied to fill in the cleared lines with the
   * ones above, thus freeing up the Well for more Tetrominoes to enter.
   */
  const rows = grid.length;
  const cols = grid[0].length;
  const clearedGrid = grid.map(l => l);
  const rowsCleared = [];

  for (let row = rows - 1; row >= 0; row--) {
    if (isLine(clearedGrid[row])) {
      for (let row2 = row; row2 >= 0; row2--) {
        clearedGrid[row2] =
          row2 > 0 ? clearedGrid[row2 - 1] : createEmptyLine(cols);
      }

      // Because the grid "falls" with every cleared line, the index of the
      // original row is smaller than the current row index by the number of
      // cleared on this occasion. We `unshift` because the lines are cleared
      // from bottom to top, but will then be applied from top to bottom
      rowsCleared.unshift(row - rowsCleared.length);

      // Go once more through the same row
      row++;
    }
  }

  return {
    clearedGrid,
    rowsCleared
  };
}

export function fitTetrominoPositionInWellBounds(
  grid: WellGrid,
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

export function getBlocksFromGridRows(
  grid: WellGrid,
  rows: Array<number>
): WellGrid {
  return rows.map(rowIndex => grid[rowIndex].map(block => block));
}

export function overrideBlockIds(
  blocks: WellGrid,
  fromCellId: number
): WellGrid {
  let nextCellId = fromCellId;

  return blocks.map(blockRow =>
    blockRow.map(block => (block ? [nextCellId++, block[1]] : null))
  );
}

export function appendBlocksToGrid(grid: WellGrid, blocks: WellGrid): WellGrid {
  const rows = grid.length;
  const cols = grid[0].length;
  const newGrid = generateEmptyGrid(rows, cols);

  // 1. Apply new block rows at the bottom, and collect top "border shape"
  // Hmm, this isn't very good, because 99% enemy blocks will create a line
  // NOTE: Old functionality left for posterity
  // const availRowsPerCol = new Array(cols).fill(rows);
  blocks.forEach((rowBlocks, rowIndex) => {
    const absRowIndex = rows - blocks.length + rowIndex;
    rowBlocks.forEach((block, colIndex) => {
      if (block) {
        newGrid[absRowIndex][colIndex] = block;
        // availRowsPerCol[colIndex] = Math.min(
        //   availRowsPerCol[colIndex],
        //   absRowIndex
        // );
      }
    });
  });

  // 2. "Pour" previous blocks over new ones
  for (let colIndex = 0; colIndex < cols; colIndex++) {
    // const rowOffset = rows - availRowsPerCol[colIndex];
    const rowOffset = blocks.length;
    for (let rowIndex = rows - 1; rowIndex >= rowOffset; rowIndex--) {
      newGrid[rowIndex - rowOffset][colIndex] = grid[rowIndex][colIndex];
    }
  }

  return newGrid;
}

export function getNextCellId(player: Player): number {
  const { max } = Math;
  const { grid, blocksCleared, blocksPending } = player;

  return (
    max(
      getMaxCellIdFromGrid(grid),
      getMaxCellIdFromGrid(blocksCleared),
      getMaxCellIdFromGrid(blocksPending)
    ) + 1
  );
}

function getMaxCellIdFromGrid(grid: WellGrid): number {
  const { max } = Math;

  return max(...grid.map(r => max(...r.map(cell => (cell ? cell[0] : 0)))));
}
