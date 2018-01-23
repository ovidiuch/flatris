// @flow

export type Color = string; // #ff0000

export type Tetromino = 'I' | 'O' | 'T' | 'J' | 'L' | 'S' | 'Z';

export type Grid<GridItem> = Array<Array<GridItem>>;

export type TetrominoGrid = Grid<0 | 1>;

export type Position2d = { x: number, y: number };

export type WallGridItem = [number, Color];

export type WallGrid = Grid<?WallGridItem>;

// This type is allows us to change user id type from number to hash string
export type UserId = number;

export type User = {
  id: UserId,
  name: string
};

export type PlayerStatus = 'PENDING' | 'READY';

export type Player = {
  user: User,
  status: PlayerStatus,
  drops: number,
  score: number,
  lines: number,
  grid: WallGrid,
  nextTetromino: Tetromino,
  activeTetromino: Tetromino,
  activeTetrominoGrid: TetrominoGrid,
  activeTetrominoPosition: Position2d,
  dropAcceleration: boolean,
  blocksFromEnemy: Grid<?Color>
};

// This type is allows us to change game id type from number to hash string
export type GameId = number;

export type GameStatus = 'PLAYING' | 'OVER';

export type Game = {
  id: GameId,
  status: GameStatus,
  players: Array<Player>,
  dropFrames: number
};

export type State = {
  curUser: ?User,
  curGame: ?Game
};
