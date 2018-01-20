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

export type StartGameAction = {
  type: 'START_GAME',
  payload: {
    userId: UserId
  }
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
