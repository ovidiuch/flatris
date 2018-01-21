/* global performance */
// @flow

import raf from 'raf';

import { DROP_FRAMES_ACCELERATED } from './constants/grid';
import { getCurGame, getPlayer } from './reducers/game';
import { getCurUserId } from './reducers/cur-user';

import type { UserId, User, GameId } from './types/state';
import type { Action, AsyncAction, Dispatch, GetState } from './types/actions';

const now =
  typeof performance !== 'undefined' && typeof performance.now === 'function'
    ? () => performance.now()
    : () => Date.now();

const FPS = 60;
const frameDuration = 1000 / FPS;

// This changes too fast (60fps) to keep it in the store's state
let yProgress = 0;

export function auth(userId: UserId, userName: string): Action {
  return {
    type: 'AUTH',
    payload: { userId, userName }
  };
}

export function createGame(gameId: GameId, user: User): Action {
  return {
    type: 'CREATE_GAME',
    broadcast: true,
    payload: {
      gameId,
      user
    }
  };
}

export function loadGame(gameId: GameId, user: User): Action {
  return {
    type: 'LOAD_GAME',
    payload: {
      gameId,
      user
    }
  };
}

export function joinGame(user: User): Action {
  return {
    type: 'JOIN_GAME',
    broadcast: true,
    payload: {
      user
    }
  };
}

export function playerReady(): AsyncAction {
  return getUserAction(userId => ({
    type: 'PLAYER_READY',
    broadcast: true,
    payload: {
      userId
    }
  }));
}

export function startGame(): AsyncAction {
  return (dispatch: Dispatch) => {
    dispatch({
      type: 'START_GAME'
    });

    dispatch(advanceGame());
  };
}

export function leaveGame(): AsyncAction {
  return () => {
    cancelFrame();
  };
}

export function advanceGame(): AsyncAction {
  return (dispatch: Dispatch, getState: GetState) => {
    cancelFrame();

    scheduleFrame(frames => {
      const state = getState();
      const userId = getCurUserId(state);
      const game = getCurGame(state);
      const { status, dropFrames } = game;
      const player = getPlayer(game, userId);
      const { dropAcceleration } = player;

      // Stop animation when game ended
      if (status === 'OVER') {
        return;
      }

      const framesPerDrop = dropAcceleration
        ? DROP_FRAMES_ACCELERATED
        : dropFrames;

      yProgress += frames / framesPerDrop;
      if (yProgress > 1) {
        dispatch({
          type: 'DROP',
          broadcast: true,
          payload: {
            userId,
            rows: Math.floor(yProgress)
          }
        });
        yProgress %= 1;
      }

      dispatch(advanceGame());
    });
  };
}

export function moveLeft(): AsyncAction {
  return getUserAction(userId => ({
    type: 'MOVE_LEFT',
    broadcast: true,
    payload: {
      userId
    }
  }));
}

export function moveRight(): AsyncAction {
  return getUserAction(userId => ({
    type: 'MOVE_RIGHT',
    broadcast: true,
    payload: {
      userId
    }
  }));
}

export function rotate(): AsyncAction {
  return getUserAction(userId => ({
    type: 'ROTATE',
    broadcast: true,
    payload: {
      userId
    }
  }));
}

export function enableAcceleration(): AsyncAction {
  return getUserAction(userId => ({
    type: 'ENABLE_ACCELERATION',
    broadcast: true,
    payload: {
      userId
    }
  }));
}

export function disableAcceleration(): AsyncAction {
  return getUserAction(userId => ({
    type: 'DISABLE_ACCELERATION',
    broadcast: true,
    payload: {
      userId
    }
  }));
}

let animationHandle;
let timeBegin;

function cancelFrame() {
  raf.cancel(animationHandle);
}

function scheduleFrame(cb) {
  timeBegin = now();
  animationHandle = raf(() => {
    const timeEnd = now();
    cb((timeEnd - timeBegin) / frameDuration);
  });
}

function getUserAction(decorateActionWithUser: (userId: UserId) => Action) {
  return (dispatch: Dispatch, getState: GetState) => {
    const state = getState();
    const userId = getCurUserId(state);

    dispatch(decorateActionWithUser(userId));
  };
}
