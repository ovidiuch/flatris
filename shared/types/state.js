// @flow

import type { ActionId, GameAction } from './actions';

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

export type PlayerStatus = 'PENDING' | 'READY' | 'PAUSE' | 'WON' | 'LOST';

export type FlashSuffix = 'a' | 'b';

export type QuakeSuffix = 'a1' | 'a2' | 'a3' | 'a4' | 'b1' | 'b2' | 'b3' | 'b4';

export type Player = {
  user: User,
  lastActionId: ActionId,
  status: PlayerStatus,
  // We track losses instead of wins because they allows us to count the number
  // of turns player per game in single player, where all turns are "lost"
  losses: number,
  drops: number,
  score: number,
  lines: number,
  grid: WellGrid,
  blocksCleared: WellGrid,
  blocksPending: WellGrid,
  activeTetromino: Tetromino,
  activeTetrominoGrid: TetrominoGrid,
  activeTetrominoPosition: Position2d,
  nextTetromino: Tetromino,
  dropAcceleration: boolean,
  flashYay: ?FlashSuffix,
  flashNay: ?FlashSuffix,
  quake: ?QuakeSuffix,
  ping: ?number
};

export type GameId = string;

export type Game = {
  id: GameId,
  players: Array<Player>,
  dropFrames: number
};

export type Games = {
  [id: GameId]: Game
};

export type BackfillId = number;

export type Backfill = {
  backfillId: BackfillId,
  queuedActions: Array<GameAction>
};

export type Backfills = {
  [gameId: GameId]: Backfill
};

export type Stats = {
  actionAcc: number,
  actionLeft: number,
  actionRight: number,
  actionRotate: number,
  games: number,
  lines: number,
  seconds: number
};

export type DailyStats = {
  [day: string]: number
};

export type State = {
  jsReady: boolean,
  curUser: ?User,
  games: Games,
  curGame: ?GameId,
  backfills: Backfills,
  stats: Stats
};
