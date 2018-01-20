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
  getNextTetromino,
  getInitialPositionForTetromino
} from '../utils/tetromino';
import { getSampleUser } from '../utils/user';
import {
  generateEmptyGrid,
  rotate,
  isPositionAvailable,
  getBottomMostPosition,
  transferTetrominoToGrid,
  clearLines,
  fitTetrominoPositionInWellBounds
} from '../utils/grid';

import type {
  Tetromino,
  User,
  Player,
  GameId,
  Game,
  State
} from '../types/state';
import type { Action } from '../types/actions';

export function gameReducer(state: void | ?Game, action: Action): ?Game {
  // Sometimes the @@INIT action is called more than once, which leads to
  // calling the reducer first with state=undefined and then again one or
  // more times with state=null. The latter calls are noops.
  if (!state) {
    if (action.type !== 'CREATE_GAME') {
      return null;
    }

    const { gameId, user } = action.payload;

    return getBlankGame({
      id: gameId,
      user
    });
  }

  switch (action.type) {
    case 'START_GAME': {
      const { userId } = action.payload;

      return {
        ...updatePlayer(state, userId, { status: 'READY' }),
        status: 'PLAYING'
      };
    }

    case 'DROP': {
      const { userId, rows } = action.payload;
      const player = getPlayer(state, userId);
      const { dropFrames } = state;
      const {
        drops,
        score,
        lines,
        nextTetromino,
        grid,
        activeTetromino,
        activeTetrominoGrid,
        activeTetrominoPosition,
        dropAcceleration
      } = player;

      let newPosition = {
        x: activeTetrominoPosition.x,
        y: activeTetrominoPosition.y + rows
      };

      // The active Tetromino keeps falling down until it hits something
      if (isPositionAvailable(grid, activeTetrominoGrid, newPosition)) {
        return updatePlayer(state, userId, {
          activeTetrominoPosition: newPosition
        });
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
        ...updatePlayer(state, userId, {
          drops: drops + 1,
          score: score + points,
          lines: lines + linesCleared,
          nextTetromino: getNextTetromino(state.id, drops + 2),
          grid: clearedGrid,
          activeTetromino: nextTetromino,
          activeTetrominoGrid: SHAPES[nextTetromino],
          activeTetrominoPosition: getInitialPositionForTetromino(
            nextTetromino,
            WELL_COLS
          ),
          // Clear acceleration after dropping Tetromino. Sometimes the key
          // events would misbehave and acceleration would remain on even after
          // releasing DOWN key
          dropAcceleration: false
        }),
        status,
        // Increase speed whenever a line is cleared (fast game)
        dropFrames: linesCleared
          ? dropFrames - DROP_FRAMES_DECREMENT
          : dropFrames
      };
    }

    case 'MOVE_LEFT':
    case 'MOVE_RIGHT': {
      const { userId } = action.payload;
      const direction = action.type === 'MOVE_LEFT' ? -1 : 1;
      const player = getPlayer(state, userId);
      const { grid, activeTetrominoGrid, activeTetrominoPosition } = player;
      const newPosition = Object.assign({}, activeTetrominoPosition, {
        x: activeTetrominoPosition.x + direction
      });

      // Attempting to move the Tetromino outside the Well bounds or over landed
      // Tetrominoes will be ignored
      if (!isPositionAvailable(grid, activeTetrominoGrid, newPosition)) {
        return state;
      }

      return updatePlayer(state, userId, {
        activeTetrominoPosition: newPosition
      });
    }

    case 'ROTATE': {
      const { userId } = action.payload;
      const player = getPlayer(state, userId);
      const { grid, activeTetrominoGrid, activeTetrominoPosition } = player;
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

      return updatePlayer(state, userId, {
        activeTetrominoGrid: newGrid,
        activeTetrominoPosition: newPosition
      });
    }

    case 'ENABLE_ACCELERATION': {
      const { userId } = action.payload;

      return updatePlayer(state, userId, {
        dropAcceleration: true
      });
    }

    case 'DISABLE_ACCELERATION': {
      const { userId } = action.payload;

      return updatePlayer(state, userId, {
        dropAcceleration: false
      });
    }

    default:
      return state;
  }
}

export function getBlankGame(
  {
    id = Date.now(),
    user = getSampleUser()
  }: {
    id?: GameId,
    user?: User,
    nextTetromino?: Tetromino,
    activeTetromino?: Tetromino
  } = {}
): Game {
  const activeTetromino = getNextTetromino(id, 0);
  const nextTetromino = getNextTetromino(id, 1);
  const activeTetrominoGrid = SHAPES[activeTetromino];
  const activeTetrominoPosition = getInitialPositionForTetromino(
    activeTetromino,
    WELL_COLS
  );

  const player1: Player = {
    user,
    status: 'PENDING',
    drops: 0,
    score: 0,
    lines: 0,
    grid: generateEmptyGrid(WELL_ROWS, WELL_COLS),
    nextTetromino,
    activeTetromino,
    activeTetrominoGrid,
    activeTetrominoPosition,
    dropAcceleration: false
  };

  return {
    id,
    status: 'PENDING',
    players: [player1],
    dropFrames: DROP_FRAMES_DEFAULT
  };
}

export function getCurGame(state: State): Game {
  if (!state.game) {
    throw new Error('Current game is missing from state');
  }

  return state.game;
}

export function getPlayer(game: Game, userId: number): Player {
  const player = game.players.find(p => p.user.id === userId);

  if (!player) {
    throw new Error(`Player with userId ${userId} does not exist`);
  }

  return player;
}

export function allPlayersReady(game: Game) {
  return (
    game.players.filter(p => p.status === 'READY').length ===
    game.players.length
  );
}

function updatePlayer(game: Game, userId: number, attrs: $Shape<Player>): Game {
  const { players } = game;
  const player = getPlayer(game, userId);
  const playerIndex = players.indexOf(player);

  return {
    ...game,
    players: [
      ...players.slice(0, playerIndex),
      { ...player, ...attrs },
      ...players.slice(playerIndex + 1)
    ]
  };
}
