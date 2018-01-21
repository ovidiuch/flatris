// @flow

import type { UserId, User, GameId, State } from './state';

export type InitAction = {
  type: '@@INIT'
};

export type CreateGameAction = {
  type: 'CREATE_GAME',
  payload: {
    gameId: GameId,
    user: User
  }
};

export type LoadGameAction = {
  type: 'LOAD_GAME',
  payload: {
    gameId: GameId,
    user: User
  }
};

export type JoinGameAction = {
  type: 'JOIN_GAME',
  payload: {
    user: User
  }
};

export type PlayerReadyAction = {
  type: 'PLAYER_READY',
  payload: {
    userId: UserId
  }
};

export type StartGameAction = {
  type: 'START_GAME'
};

export type MoveLeftAction = {
  type: 'MOVE_LEFT',
  payload: {
    userId: UserId
  }
};

export type MoveRightAction = {
  type: 'MOVE_RIGHT',
  payload: {
    userId: UserId
  }
};

export type RotateAction = {
  type: 'ROTATE',
  payload: {
    userId: UserId
  }
};

export type DropAction = {
  type: 'DROP',
  payload: {
    userId: UserId,
    rows: number
  }
};

export type EnableAccelerationAction = {
  type: 'ENABLE_ACCELERATION',
  payload: {
    userId: UserId
  }
};

export type DisableAccelerationAction = {
  type: 'DISABLE_ACCELERATION',
  payload: {
    userId: UserId
  }
};

type GameAction =
  | CreateGameAction
  | LoadGameAction
  | JoinGameAction
  | PlayerReadyAction
  | StartGameAction
  | MoveLeftAction
  | MoveRightAction
  | RotateAction
  | DropAction
  | EnableAccelerationAction
  | DisableAccelerationAction;

export type AuthAction = {
  type: 'AUTH',
  payload: {
    userId: UserId,
    userName: string
  }
};

export type Action = InitAction | GameAction | AuthAction;

export type GetState = () => State;

export type AsyncAction = (dispatch: Dispatch, getState: GetState) => any;

export type Dispatch = (Action | AsyncAction) => any;
