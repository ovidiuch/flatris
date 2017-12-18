// @flow

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
} from '../utils/tetromino';
import {
  generateEmptyGrid,
  rotate,
  isPositionAvailable,
  getBottomMostPosition,
  transferTetrominoToGrid,
  clearLines,
  fitTetrominoPositionInWellBounds
} from '../utils/grid';

import type { Tetromino, Game, User, UserStatus, Action } from '../types';

export default (state: void | Game, action: Action): Game => {
  if (typeof state === 'undefined') {
    return getBlankGame();
  }

  switch (action.type) {
    case 'START_GAME': {
      const { maxPlayers, curUser } = action.payload;

      return {
        ...getBlankGame(),
        status: 'PLAYING',
        maxPlayers,
        users: [curUser],
        activeUserId: null
      };
    }

    case 'ADVANCE_GAME': {
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

      let newPosition = {
        x: activeTetrominoPosition.x,
        y: activeTetrominoPosition.y + rows
      };

      // The active Tetromino keeps falling down until it hits something
      if (isPositionAvailable(grid, activeTetrominoGrid, newPosition)) {
        return {
          ...state,
          activeTetrominoPosition: newPosition
        };
      }

      // A big frame skip could cause the Tetromino to jump more than one row.
      // We need to ensure it ends up in the bottom-most one in case the jump
      // caused the Tetromino to land
      newPosition = getBottomMostPosition(
        grid,
        activeTetrominoGrid,
        newPosition
      );

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
      const status = newPosition.y < 0 ? 'OVER' : 'PLAYING';

      return {
        ...state,
        status,
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
        dropFrames: linesCleared
          ? dropFrames - DROP_FRAMES_DECREMENT
          : dropFrames
      };
    }

    case 'STOP_PLAYING': {
      return changeUserState(state, action.payload.userId, 'WATCHING');
    }

    case 'START_PLAYING': {
      return changeUserState(state, action.payload.userId, 'PLAYING');
    }

    case 'MOVE': {
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

      return {
        ...state,
        activeTetrominoPosition: newPosition
      };
    }

    case 'ROTATE': {
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

      return {
        ...state,
        activeTetrominoGrid: newGrid,
        activeTetrominoPosition: newPosition
      };
    }

    case 'ENABLE_ACCELERATION': {
      return {
        ...state,
        dropAcceleration: true
      };
    }

    case 'DISABLE_ACCELERATION': {
      return {
        ...state,
        dropAcceleration: false
      };
    }

    default:
      return state;
  }
};

export function getBlankGame(
  nextTetromino: Tetromino = getRandomTetromino(),
  activeTetromino: Tetromino = getRandomTetromino()
): Game {
  const activeTetrominoGrid = SHAPES[activeTetromino];
  const activeTetrominoPosition = getInitialPositionForTetromino(
    activeTetromino,
    WELL_COLS
  );

  return {
    status: 'PENDING',
    maxPlayers: 8,
    users: [],
    activeUserId: null,
    score: 0,
    lines: 0,
    grid: generateEmptyGrid(WELL_ROWS, WELL_COLS),
    nextTetromino,
    activeTetromino,
    activeTetrominoGrid,
    activeTetrominoPosition,
    dropFrames: DROP_FRAMES_DEFAULT,
    dropAcceleration: false
  };
}

export function isAnyonePlaying(game: Game): boolean {
  return getPlayingUsers(game).length > 0;
}

export function getPlayingUsers(game: Game): Array<User> {
  return game.users.filter(u => u.status === 'PLAYING');
}

export function getUser(game: Game, userId: number): ?User {
  return game.users.find(u => u.id === userId);
}

function changeUserState(game: Game, userId: number, status: UserStatus): Game {
  const user = getUser(game, userId);

  // User with provided id not found in this game. Weird.
  if (!user) {
    return game;
  }

  const { users } = game;
  const userIndex = users.indexOf(user);

  return {
    ...game,
    users: [
      ...users.slice(0, userIndex),
      { ...user, status },
      ...users.slice(userIndex + 1)
    ]
  };
}
