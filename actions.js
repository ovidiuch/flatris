/* global performance */
// @flow

import raf from 'raf';

import { DROP_FRAMES_ACCELERATED } from './constants/grid';
import { getPlayingUsers, isAnyonePlaying } from './reducers/game';

import type { User, Dispatch, GetState } from './types';

const now =
  typeof performance !== 'undefined' && typeof performance.now === 'function'
    ? () => performance.now()
    : () => Date.now();

const FPS = 60;
const frameDuration = 1000 / FPS;

// This changes too fast (60fps) to keep it in the store's state
let yProgress = 0;

export function startGame(maxPlayers: number, curUser: User) {
  return (dispatch: Dispatch) => {
    dispatch({
      type: 'START_GAME',
      payload: { maxPlayers, curUser }
    });

    dispatch(advanceGame());
  };
}

export function advanceGame() {
  return (dispatch: Dispatch, getState: GetState) => {
    cancelFrame();

    scheduleFrame(frames => {
      const { status, dropAcceleration, dropFrames } = getState().game;

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
          payload: { rows: Math.floor(yProgress) }
        });
        yProgress %= 1;
      }

      dispatch(advanceGame());
    });
  };
}

export function stopPlaying(userId: number) {
  return (dispatch: Dispatch, getState: GetState) => {
    dispatch({
      type: 'STOP_PLAYING',
      payload: {
        userId
      }
    });

    // Pause game when nobody's playing. Possible scenarios:
    // - Solo player, who is allowed to pause
    // - A game with watchers where the last playing user left (TODO: treat)
    if (!isAnyonePlaying(getState().game)) {
      cancelFrame();
    }
  };
}

export function startPlaying(userId: number) {
  return (dispatch: Dispatch, getState: GetState) => {
    dispatch({
      type: 'START_PLAYING',
      payload: {
        userId
      }
    });

    // Resume game if it was previously paused (if no player was playing before)
    if (getPlayingUsers(getState().game).length === 1) {
      dispatch(advanceGame());
    }
  };
}

export function moveLeft() {
  return {
    type: 'MOVE',
    payload: { direction: -1 }
  };
}

export function moveRight() {
  return {
    type: 'MOVE',
    payload: { direction: 1 }
  };
}

export function rotate() {
  return {
    type: 'ROTATE'
  };
}

export function enableAcceleration() {
  return {
    type: 'ENABLE_ACCELERATION'
  };
}

export function disableAcceleration() {
  return {
    type: 'DISABLE_ACCELERATION'
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
