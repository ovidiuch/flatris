// @flow

import { Component } from 'react';
import { getSampleUser, getSampleUser2 } from '../../../utils/test-helpers';
import {
  getBlankGame,
  addUserToGame,
  updatePlayer
} from '../../../reducers/game';
import FlatrisGame from '../../FlatrisGame';

import type { ElementRef } from 'react';

const user = getSampleUser();
let game = getBlankGame({
  id: 'dce6b11e',
  user,
  // XXX: This test is CPU intensive and due to the frame skipping mechanism of
  // Flatris, test results often differ between local test runs and CI. To
  // alleviate this, we made the speed unrealistically slow.
  dropFrames: 600 // Should drop one row per 10 seconds
});

// Add 2nd player to game state
const user2 = getSampleUser2();
game = addUserToGame(game, user2);

// Add some blocks to current user's grid
game = updatePlayer(game, user.id, {
  status: 'READY',
  grid: [
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
    [
      [11, '#fbb414'],
      [12, '#fbb414'],
      null,
      null,
      null,
      null,
      null,
      [4, '#b04497'],
      null,
      null
    ],
    [
      [10, '#fbb414'],
      [9, '#fbb414'],
      [8, '#3cc7d6'],
      [7, '#3cc7d6'],
      [6, '#3cc7d6'],
      [5, '#3cc7d6'],
      [3, '#b04497'],
      [2, '#b04497'],
      [1, '#b04497'],
      null
    ]
  ],
  activeTetromino: 'I',
  activeTetrominoGrid: [[0, 0, 1, 0], [0, 0, 1, 0], [0, 0, 1, 0], [0, 0, 1, 0]],
  activeTetrominoPosition: { x: 7, y: 16 },
  dropAcceleration: true
});

async function doAfter(delay, fn) {
  return new Promise(res => {
    setTimeout(() => {
      fn();
      res();
    }, delay);
  });
}

export default {
  component: FlatrisGame,

  async init({ compRef }: { compRef: ElementRef<typeof Component> }) {
    const { dispatch } = compRef.context.store;

    // 1: Simulate drop from current player, which causes some lines to clear
    // and get passed to enemy as blocksPending
    await doAfter(500, () => {
      dispatch({
        type: 'DROP',
        payload: {
          gameId: game.id,
          userId: user.id,
          rows: 1
        }
      });
    });

    // 2: Apply pending enemy blocks, causing enemy grid to grow by one row
    await doAfter(100, () => {
      dispatch({
        type: 'APPEND_PENDING_BLOCKS',
        payload: {
          gameId: game.id,
          userId: user2.id
        }
      });
    });

    // 3: Trigger DROP for enemy action, which will clear four lines due to the
    // vertical active Tetromino line hitting bottom
    await doAfter(500, () => {
      dispatch({
        type: 'DROP',
        payload: {
          gameId: game.id,
          userId: user2.id,
          rows: 1
        }
      });
    });

    // 4: No need to trigger APPEND_PENDING_BLOCKS action for current user
    // because it is triggered automatically for current user (see
    // FlatrisGame#componentDidUpdate)

    // 5: Trigger DROP action for current player, which will clear three lines
    // due to the 3 blocks remaining from the vertical active Tetromino line
    // which hit bottom and cleared one line in Step 1
    await doAfter(500, () => {
      dispatch({
        type: 'DROP',
        payload: {
          gameId: game.id,
          userId: user.id,
          rows: 1
        }
      });
    });
  },

  reduxState: {
    curUser: user,
    curGame: updatePlayer(game, user2.id, {
      status: 'READY',
      drops: 50,
      score: 184,
      lines: 0,
      activeTetromino: 'I',
      activeTetrominoGrid: [
        [0, 0, 1, 0],
        [0, 0, 1, 0],
        [0, 0, 1, 0],
        [0, 0, 1, 0]
      ],
      activeTetrominoPosition: { x: 7, y: 16 },
      dropAcceleration: true,
      grid: [
        [null, null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null, null],
        [
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          [1956, '#b04497'],
          null,
          null
        ],
        [
          null,
          [1928, '#3993d0'],
          [1929, '#3993d0'],
          [1976, '#ed652f'],
          null,
          null,
          [1957, '#b04497'],
          [1958, '#b04497'],
          [1959, '#b04497'],
          null
        ],
        [
          null,
          [1930, '#3993d0'],
          [1920, '#3cc7d6'],
          [1977, '#ed652f'],
          null,
          [1940, '#fbb414'],
          [1941, '#fbb414'],
          [1936, '#ed652f'],
          [1937, '#ed652f'],
          null
        ],
        [
          [1904, '#b04497'],
          [1931, '#3993d0'],
          [1921, '#3cc7d6'],
          [1978, '#ed652f'],
          [1979, '#ed652f'],
          [1942, '#fbb414'],
          [1943, '#fbb414'],
          [1924, '#e84138'],
          [1938, '#ed652f'],
          null
        ],
        [
          [1905, '#b04497'],
          [1906, '#b04497'],
          [1922, '#3cc7d6'],
          [1916, '#3993d0'],
          [1932, '#fbb414'],
          [1933, '#fbb414'],
          [1925, '#e84138'],
          [1926, '#e84138'],
          [1939, '#ed652f'],
          null
        ],
        [
          [1907, '#b04497'],
          [1892, '#e84138'],
          [1923, '#3cc7d6'],
          [1917, '#3993d0'],
          [1934, '#fbb414'],
          [1935, '#fbb414'],
          [1927, '#e84138'],
          [1912, '#ed652f'],
          [1908, '#3993d0'],
          null
        ],
        [
          [1893, '#e84138'],
          [1894, '#e84138'],
          [1918, '#3993d0'],
          [1919, '#3993d0'],
          [1896, '#95c43d'],
          [1913, '#ed652f'],
          [1914, '#ed652f'],
          [1915, '#ed652f'],
          [1909, '#3993d0'],
          null
        ],
        [
          [1895, '#e84138'],
          [1884, '#b04497'],
          [1888, '#e84138'],
          [1889, '#e84138'],
          [1897, '#95c43d'],
          [1898, '#95c43d'],
          [1900, '#3993d0'],
          [1910, '#3993d0'],
          [1911, '#3993d0'],
          null
        ],
        [
          [1885, '#b04497'],
          [1886, '#b04497'],
          [1887, '#b04497'],
          [1890, '#e84138'],
          [1891, '#e84138'],
          [1899, '#95c43d'],
          [1901, '#3993d0'],
          [1902, '#3993d0'],
          [1903, '#3993d0'],
          null
        ]
      ]
    })
  }
};
