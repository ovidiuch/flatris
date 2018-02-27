// @flow

import type { UserId, User, GameId, Game, State } from './state';

export type ActionId = number;

export type JsLoadAction = {
  type: 'JS_LOAD'
};

export type AuthAction = {
  type: 'AUTH',
  payload: {
    user: User
  }
};

export type DashboardLoadAction = {
  type: 'LOAD_DASHBOARD',
  payload: {
    games: Array<Game>
  }
};

export type AddGameAction = {
  type: 'ADD_GAME',
  payload: {
    game: Game
  }
};

export type RemoveGameAction = {
  type: 'REMOVE_GAME',
  payload: {
    gameId: GameId
  }
};

export type OpenGameAction = {
  type: 'OPEN_GAME',
  payload: {
    gameId: GameId
  }
};

export type CloseGameAction = {
  type: 'CLOSE_GAME'
};

export type StripGameEffectsAction = {
  type: 'STRIP_GAME_EFFECTS'
};

export type JoinGameAction = {
  type: 'JOIN_GAME',
  payload: {
    actionId: ActionId,
    prevActionId: 0,
    gameId: GameId,
    userId: UserId,
    user: User
  }
};

export type PlayerReadyAction = {
  type: 'PLAYER_READY',
  payload: {
    actionId: ActionId,
    prevActionId: ActionId,
    gameId: GameId,
    userId: UserId
  }
};

export type PlayerPauseAction = {
  type: 'PLAYER_PAUSE',
  payload: {
    actionId: ActionId,
    prevActionId: ActionId,
    gameId: GameId,
    userId: UserId
  }
};

export type MoveLeftAction = {
  type: 'MOVE_LEFT',
  payload: {
    actionId: ActionId,
    prevActionId: ActionId,
    gameId: GameId,
    userId: UserId
  }
};

export type MoveRightAction = {
  type: 'MOVE_RIGHT',
  payload: {
    actionId: ActionId,
    prevActionId: ActionId,
    gameId: GameId,
    userId: UserId
  }
};

export type RotateAction = {
  type: 'ROTATE',
  payload: {
    actionId: ActionId,
    prevActionId: ActionId,
    gameId: GameId,
    userId: UserId
  }
};

export type DropAction = {
  type: 'DROP',
  payload: {
    actionId: ActionId,
    prevActionId: ActionId,
    gameId: GameId,
    userId: UserId,
    rows: number
  }
};

export type EnableAccelerationAction = {
  type: 'ENABLE_ACCELERATION',
  payload: {
    actionId: ActionId,
    prevActionId: ActionId,
    gameId: GameId,
    userId: UserId
  }
};

export type DisableAccelerationAction = {
  type: 'DISABLE_ACCELERATION',
  payload: {
    actionId: ActionId,
    prevActionId: ActionId,
    gameId: GameId,
    userId: UserId
  }
};

export type AppendPendingBlocksAction = {
  type: 'APPEND_PENDING_BLOCKS',
  payload: {
    actionId: ActionId,
    prevActionId: ActionId,
    gameId: GameId,
    userId: UserId
  }
};

export type PingAction = {
  type: 'PING',
  payload: {
    actionId: ActionId,
    prevActionId: ActionId,
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

export type Action =
  | JsLoadAction
  | AuthAction
  | DashboardLoadAction
  | AddGameAction
  | RemoveGameAction
  | OpenGameAction
  | CloseGameAction
  | StripGameEffectsAction
  | GameAction;

export type GetState = () => State;

export type ThunkAction = (
  dispatch: Dispatch,
  getState: GetState
) => void | Action;

export type Dispatch = (Action | ThunkAction) => Action;
