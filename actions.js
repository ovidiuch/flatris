/* global performance */
// @flow

import raf from 'raf';

import { DROP_FRAMES_ACCELERATED } from './constants/grid';
import { getPlayer, allPlayersReady } from './reducers/game';

import type { UserId, User } from './types/state';
import type { Action, Dispatch, GetState } from './types/actions';

const now =
  typeof performance !== 'undefined' && typeof performance.now === 'function'
    ? () => performance.now()
    : () => Date.now();

const FPS = 60;
const frameDuration = 1000 / FPS;

// This changes too fast (60fps) to keep it in the store's state
let yProgress = 0;

export function createGame(user: User): Action {
  return {
    type: 'CREATE_GAME',
    payload: { user }
  };
}

export function startGame(userId: UserId) {
  return (dispatch: Dispatch, getState: GetState) => {
    dispatch({
      type: 'START_GAME',
      payload: { userId }
    });

    if (allPlayersReady(getState().game)) {
      dispatch(advanceGame());
    }
  };
}

export function advanceGame() {
  return (dispatch: Dispatch, getState: GetState) => {
    cancelFrame();

    scheduleFrame(frames => {
      const { curUser, game } = getState();
      const { status, dropFrames } = game;
      const player = getPlayer(game, curUser.id);
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
          type: 'ADVANCE_GAME',
          payload: {
            userId: curUser.id,
            rows: Math.floor(yProgress)
          }
        });
        yProgress %= 1;
      }

      dispatch(advanceGame());
    });
  };
}

export function leaveGame() {
  return () => {
    cancelFrame();
  };
}

export function moveLeft(userId: UserId): Action {
  return {
    type: 'MOVE',
    payload: {
      userId,
      direction: -1
    }
  };
}

export function moveRight(userId: UserId): Action {
  return {
    type: 'MOVE',
    payload: {
      userId,
      direction: 1
    }
  };
}

export function rotate(userId: UserId): Action {
  return {
    type: 'ROTATE',
    payload: {
      userId
    }
  };
}

export function enableAcceleration(userId: UserId): Action {
  return {
    type: 'ENABLE_ACCELERATION',
    payload: {
      userId
    }
  };
}

export function disableAcceleration(userId: UserId): Action {
  return {
    type: 'DISABLE_ACCELERATION',
    payload: {
      userId
    }
  };
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
