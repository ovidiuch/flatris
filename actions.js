/* global performance */
// @flow

import raf from 'raf';

import { DROP_FRAMES_ACCELERATED } from './constants/grid';
import { getCurGame, getPlayer, allPlayersReady } from './reducers/game';
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
    payload: {
      gameId,
      user
    }
  };
}

export function startGame() {
  return (dispatch: Dispatch, getState: GetState) => {
    const userId = getCurUserId(getState());

    dispatch({
      type: 'START_GAME',
      payload: { userId }
    });

    const game = getCurGame(getState());
    if (allPlayersReady(game)) {
      dispatch(advanceGame());
    }
  };
}

export function leaveGame() {
  return () => {
    cancelFrame();
  };
}

export function advanceGame() {
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
    payload: {
      userId
    }
  }));
}

export function moveRight(): AsyncAction {
  return getUserAction(userId => ({
    type: 'MOVE_RIGHT',
    payload: {
      userId
    }
  }));
}

export function rotate(): AsyncAction {
  return getUserAction(userId => ({
    type: 'ROTATE',
    payload: {
      userId
    }
  }));
}

export function enableAcceleration(): AsyncAction {
  return getUserAction(userId => ({
    type: 'ENABLE_ACCELERATION',
    payload: {
      userId
    }
  }));
}

export function disableAcceleration(): AsyncAction {
  return getUserAction(userId => ({
    type: 'DISABLE_ACCELERATION',
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
