// @flow

export type Color = string; // #ff0000

export type Tetromino = 'I' | 'O' | 'T' | 'J' | 'L' | 'S' | 'Z';

export type Grid<GridItem> = Array<Array<GridItem>>;

export type TetrominoGrid = Grid<0 | 1>;

export type Position2d = { x: number, y: number };

export type WellGridItem = [number, Color];

export type WellGrid = Grid<?WellGridItem>;

export type UserId = string;

export type User = {
  id: UserId,
  name: string
};

export type PlayerStatus = 'PENDING' | 'READY';

export type FlashSuffix = 'a' | 'b';

export type QuakeSuffix = 'a1' | 'a2' | 'a3' | 'a4' | 'b1' | 'b2' | 'b3' | 'b4';

export type Player = {
  user: User,
  status: PlayerStatus,
  drops: number,
  score: number,
  lines: number,
  grid: WellGrid,
  blocksCleared: WellGrid,
  blocksPending: WellGrid,
  nextTetromino: Tetromino,
  activeTetromino: Tetromino,
  activeTetrominoGrid: TetrominoGrid,
  activeTetrominoPosition: Position2d,
  dropAcceleration: boolean,
  flashYay: ?FlashSuffix,
  flashNay: ?FlashSuffix,
  quake: ?QuakeSuffix
};

export type GameId = string;

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
