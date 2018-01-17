// @flow

import type { State, UserId, User } from './state';

export type CreateGameAction = {
  type: 'CREATE_GAME',
  payload: {
    user: User
  }
};

export type StartGameAction = {
  type: 'START_GAME',
  payload: {
    userId: UserId
  }
};

export type AdvanceGameAction = {
  type: 'ADVANCE_GAME',
  payload: {
    userId: UserId,
    rows: number
  }
};

export type LeaveGameAction = {
  type: 'LEAVE_GAME',
  payload: {
    userId: UserId
  }
};

export type MoveAction = {
  type: 'MOVE',
  payload: {
    userId: UserId,
    direction: -1 | 1
  }
};

export type RotateAction = {
  type: 'ROTATE',
  payload: {
    userId: UserId
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

export type GetState = () => State;

export type Action =
  | CreateGameAction
  | StartGameAction
  | AdvanceGameAction
  | LeaveGameAction
  | MoveAction
  | RotateAction
  | EnableAccelerationAction
  | DisableAccelerationAction;

export type AsyncAction = (dispatch: Dispatch, getState: GetState) => any;

export type Dispatch = (Action | AsyncAction) => any;
