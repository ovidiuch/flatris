/* global performance */
// @flow

import raf from 'raf';

import { DROP_FRAMES_ACCELERATED } from 'shared/constants/grid';
import { getPlayer, allPlayersReady } from 'shared/reducers/game';
import { getCurGame } from '../reducers/cur-game';
import { getCurUser } from '../reducers/cur-user';

import type { ThunkAction, Dispatch, GetState } from 'shared/types/actions';

const now =
  typeof performance !== 'undefined' && typeof performance.now === 'function'
    ? () => performance.now()
    : () => Date.now();

const FPS = 60;
const frameDuration = 1000 / FPS;

// This changes too fast (60fps) to keep it in the store's state
let yProgress = 0;

export function runGameFrame(drop: (rows: number) => any): ThunkAction {
  return (dispatch: Dispatch, getState: GetState) => {
    cancelGameFrame();

    scheduleFrame(frames => {
      if (frames > 3) {
        console.warn(`Perf degrated: ${frames - 1} frames skipped.`);
      }

      const state = getState();
      const userId = getCurUser(state).id;
      const game = getCurGame(state);
      const { dropFrames } = game;
      const player = getPlayer(game, userId);
      const { dropAcceleration } = player;

      // Stop animation when game ended (players change status to WON/LOST)
      if (!allPlayersReady(game)) {
        return;
      }

      const framesPerDrop = dropAcceleration
        ? DROP_FRAMES_ACCELERATED
        : dropFrames;

      yProgress += frames / framesPerDrop;

      if (yProgress > 1) {
        const rows = Math.floor(yProgress);
        drop(rows);

        yProgress %= 1;
      }

      dispatch(runGameFrame(drop));
    });
  };
}

export function cancelGameFrame() {
  raf.cancel(animationHandle);
}

let animationHandle;
let timeBegin;

function scheduleFrame(cb) {
  timeBegin = now();
  animationHandle = raf(() => {
    const timeEnd = now();
    cb((timeEnd - timeBegin) / frameDuration);
  });
}
