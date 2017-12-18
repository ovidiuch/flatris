// @flow

export type UserStatus = 'WATCHING' | 'PLAYING';

export type User = {
  id: number,
  status: UserStatus
};

export type GameStatus = 'PENDING' | 'PLAYING' | 'OVER';

export type Tetromino = 'I' | 'O' | 'T' | 'J' | 'L' | 'S' | 'Z';

export type Grid<GridItem> = Array<Array<GridItem>>;

export type TetrominoGrid = Grid<0 | 1>;

export type Position2d = { x: number, y: number };

export type WallGridItem = [number, string];

export type WallGrid = Grid<?WallGridItem>;

export type Game = {
  status: GameStatus,
  maxPlayers: number,
  users: Array<User>,
  activeUserId: ?number,
  score: number,
  lines: number,
  grid: WallGrid,
  nextTetromino: Tetromino,
  activeTetromino: Tetromino,
  activeTetrominoGrid: TetrominoGrid,
  activeTetrominoPosition: Position2d,
  dropFrames: number,
  dropAcceleration: boolean
};

export type StartGameAction = {
  type: 'START_GAME',
  payload: {
    maxPlayers: number,
    curUser: User
  }
};

export type AdvanceGameAction = {
  type: 'ADVANCE_GAME',
  payload: {
    rows: number
  }
};

export type StopPlayingAction = {
  type: 'STOP_PLAYING',
  payload: {
    userId: number
  }
};

export type StartPlayingAction = {
  type: 'START_PLAYING',
  payload: {
    userId: number
  }
};

export type MoveAction = {
  type: 'MOVE',
  payload: {
    direction: -1 | 1
  }
};

export type RotateAction = {
  type: 'ROTATE'
};

export type EnableAccelerationAction = {
  type: 'ENABLE_ACCELERATION'
};

export type DisableAccelerationAction = {
  type: 'DISABLE_ACCELERATION'
};

export type State = { game: Game, userId: number };

export type GetState = () => State;

export type Action =
  | StartGameAction
  | AdvanceGameAction
  | StopPlayingAction
  | StartPlayingAction
  | MoveAction
  | RotateAction
  | EnableAccelerationAction
  | DisableAccelerationAction;

export type AsyncAction = (dispatch: Dispatch, getState: GetState) => any;

export type Dispatch = (Action | AsyncAction) => any;
