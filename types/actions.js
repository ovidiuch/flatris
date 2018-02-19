// @flow

import type { UserId, User, GameId, Game, State } from './state';

export type InitAction = {
  type: '@@INIT'
};

export type AuthAction = {
  type: 'AUTH',
  payload: {
    user: User
  }
};

export type LoadGameAction = {
  type: 'LOAD_GAME',
  payload: {
    game: Game
  }
};

export type JoinGameAction = {
  type: 'JOIN_GAME',
  payload: {
    gameId: GameId,
    user: User
  }
};

export type PlayerReadyAction = {
  type: 'PLAYER_READY',
  payload: {
    gameId: GameId,
    userId: UserId
  }
};

export type PlayerPauseAction = {
  type: 'PLAYER_PAUSE',
  payload: {
    gameId: GameId,
    userId: UserId
  }
};

export type MoveLeftAction = {
  type: 'MOVE_LEFT',
  payload: {
    gameId: GameId,
    userId: UserId
  }
};

export type MoveRightAction = {
  type: 'MOVE_RIGHT',
  payload: {
    gameId: GameId,
    userId: UserId
  }
};

export type RotateAction = {
  type: 'ROTATE',
  payload: {
    gameId: GameId,
    userId: UserId
  }
};

export type DropAction = {
  type: 'DROP',
  payload: {
    gameId: GameId,
    userId: UserId,
    rows: number
  }
};

export type EnableAccelerationAction = {
  type: 'ENABLE_ACCELERATION',
  payload: {
    gameId: GameId,
    userId: UserId
  }
};

export type DisableAccelerationAction = {
  type: 'DISABLE_ACCELERATION',
  payload: {
    gameId: GameId,
    userId: UserId
  }
};

export type AppendPendingBlocksAction = {
  type: 'APPEND_PENDING_BLOCKS',
  payload: {
    gameId: GameId,
    userId: UserId
  }
};

export type PingAction = {
  type: 'PING',
  payload: {
    gameId: GameId,
    userId: UserId,
    time: number
  }
};

export type GameAction =
  | JoinGameAction
  | PlayerReadyAction
  | PlayerPauseAction
  | MoveLeftAction
  | MoveRightAction
  | RotateAction
  | DropAction
  | EnableAccelerationAction
  | DisableAccelerationAction
  | AppendPendingBlocksAction
  | PingAction;

export type Action = InitAction | AuthAction | LoadGameAction | GameAction;

export type GetState = () => State;

export type ThunkAction = (
  dispatch: Dispatch,
  getState: GetState
) => void | Action;

export type Dispatch = (Action | ThunkAction) => Action;
