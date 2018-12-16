// @flow

import { getPlayer } from 'shared/reducers/game';
import { getCurGame } from '../reducers/cur-game';
import { getCurUser } from '../reducers/cur-user';

import type { UserId, User, GameId } from 'shared/types/state';
import type {
  ActionId,
  JoinGameAction,
  Action,
  ThunkAction,
  Dispatch,
  GetState
} from 'shared/types/actions';

export function joinGame(gameId: GameId, user: User): JoinGameAction {
  return {
    type: 'JOIN_GAME',
    payload: {
      actionId: getActionId(0),
      prevActionId: 0,
      userId: user.id,
      gameId,
      user
    }
  };
}

export function playerReady(): ThunkAction {
  return decorateGameAction(({ actionId, prevActionId, userId, gameId }) => ({
    type: 'PLAYER_READY',
    payload: {
      actionId,
      prevActionId,
      userId,
      gameId
    }
  }));
}

export function playerPause(): ThunkAction {
  return decorateGameAction(({ actionId, prevActionId, userId, gameId }) => ({
    type: 'PLAYER_PAUSE',
    payload: {
      actionId,
      prevActionId,
      userId,
      gameId
    }
  }));
}

export function drop(rows: number): ThunkAction {
  return decorateGameAction(({ actionId, prevActionId, userId, gameId }) => ({
    type: 'DROP',
    payload: {
      actionId,
      prevActionId,
      userId,
      gameId,
      rows
    }
  }));
}

export function moveLeft(): ThunkAction {
  return decorateGameAction(({ actionId, prevActionId, userId, gameId }) => ({
    type: 'MOVE_LEFT',
    payload: {
      actionId,
      prevActionId,
      userId,
      gameId
    }
  }));
}

export function moveRight(): ThunkAction {
  return decorateGameAction(({ actionId, prevActionId, userId, gameId }) => ({
    type: 'MOVE_RIGHT',
    payload: {
      actionId,
      prevActionId,
      userId,
      gameId
    }
  }));
}

export function rotate(): ThunkAction {
  return decorateGameAction(({ actionId, prevActionId, userId, gameId }) => ({
    type: 'ROTATE',
    payload: {
      actionId,
      prevActionId,
      userId,
      gameId
    }
  }));
}

export function enableAcceleration(): ThunkAction {
  return decorateGameAction(({ actionId, prevActionId, userId, gameId }) => ({
    type: 'ENABLE_ACCELERATION',
    payload: {
      actionId,
      prevActionId,
      userId,
      gameId
    }
  }));
}

export function disableAcceleration(): ThunkAction {
  return decorateGameAction(({ actionId, prevActionId, userId, gameId }) => ({
    type: 'DISABLE_ACCELERATION',
    payload: {
      actionId,
      prevActionId,
      userId,
      gameId
    }
  }));
}

export function appendPendingBlocks(): ThunkAction {
  return decorateGameAction(({ actionId, prevActionId, userId, gameId }) => ({
    type: 'APPEND_PENDING_BLOCKS',
    payload: {
      actionId,
      prevActionId,
      userId,
      gameId
    }
  }));
}

export function ping(): ThunkAction {
  return decorateGameAction(({ actionId, prevActionId, userId, gameId }) => ({
    type: 'PING',
    payload: {
      actionId,
      prevActionId,
      userId,
      gameId,
      time: Date.now()
    }
  }));
}

type GameActionDecorator = ({
  actionId: ActionId,
  prevActionId: ActionId,
  gameId: GameId,
  userId: UserId
}) => Action;

function decorateGameAction(fn: GameActionDecorator): ThunkAction {
  return (dispatch: Dispatch, getState: GetState) => {
    const state = getState();

    const userId = getCurUser(state).id;
    const curGame = getCurGame(state);

    const player = getPlayer(curGame, userId);
    const { lastActionId: prevActionId } = player;
    const actionId = getActionId(prevActionId);

    return dispatch(fn({ actionId, prevActionId, userId, gameId: curGame.id }));
  };
}

function getActionId(prevActionId: ActionId): ActionId {
  // Ensure action ids never duplicate (only relevant if two actions occur
  // within the same millisecond)
  return Math.max(Date.now(), prevActionId + 1);
}
