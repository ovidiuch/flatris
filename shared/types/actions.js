// @flow

import type {
  UserId,
  User,
  GameId,
  Game,
  BackfillId,
  Stats,
  State
} from './state';

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

export type UnauthAction = {
  type: 'UNAUTH'
};

export type DashboardLoadAction = {
  type: 'LOAD_DASHBOARD',
  payload: {
    games: Array<Game>,
    stats: Stats
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

export type StartBackfillAction = {
  type: 'START_BACKFILL',
  payload: {
    gameId: GameId,
    backfillId: BackfillId
  }
};

export type EndBackfillAction = {
  type: 'END_BACKFILL',
  payload: {
    backfillId: BackfillId
  }
};

export type QueueGameAction = {
  type: 'QUEUE_GAME_ACTION',
  payload: {
    action: GameAction
  }
};

export type UpdateStatsAction = {
  type: 'UPDATE_STATS',
  payload: {
    stats: Stats
  }
};

type GameActionPayload = {
  actionId: ActionId,
  prevActionId: ActionId,
  gameId: GameId,
  userId: UserId
};

export type JoinGameAction = {
  type: 'JOIN_GAME',
  payload: GameActionPayload & {
    user: User
  }
};

export type PlayerReadyAction = {
  type: 'PLAYER_READY',
  payload: GameActionPayload
};

export type PlayerPauseAction = {
  type: 'PLAYER_PAUSE',
  payload: GameActionPayload
};

export type MoveLeftAction = {
  type: 'MOVE_LEFT',
  payload: GameActionPayload
};

export type MoveRightAction = {
  type: 'MOVE_RIGHT',
  payload: GameActionPayload
};

export type RotateAction = {
  type: 'ROTATE',
  payload: GameActionPayload
};

export type DropAction = {
  type: 'DROP',
  payload: GameActionPayload & {
    rows: number
  }
};

export type EnableAccelerationAction = {
  type: 'ENABLE_ACCELERATION',
  payload: GameActionPayload
};

export type DisableAccelerationAction = {
  type: 'DISABLE_ACCELERATION',
  payload: GameActionPayload
};

export type AppendPendingBlocksAction = {
  type: 'APPEND_PENDING_BLOCKS',
  payload: GameActionPayload
};

export type PingAction = {
  type: 'PING',
  payload: GameActionPayload & {
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
  | UnauthAction
  | DashboardLoadAction
  | AddGameAction
  | RemoveGameAction
  | OpenGameAction
  | CloseGameAction
  | StripGameEffectsAction
  | StartBackfillAction
  | EndBackfillAction
  | QueueGameAction
  | UpdateStatsAction
  | GameAction;

export type GetState = () => State;

export type ThunkAction = (
  dispatch: Dispatch,
  getState: GetState
) => void | Action;

type DispatchRegular<A: Action> = (action: A) => Action;

type DispatchThunk = ThunkAction => void | Action;

export type Dispatch = DispatchRegular<Action> & DispatchThunk;
