// @flow

import { Component } from 'react';
import { getSampleUser } from '../../../utils/test-helpers';
import { getBlankGame } from '../../../reducers/game';
import FlatrisGame from '../../FlatrisGame';

import type { ElementRef } from 'react';

const user = getSampleUser();
const game = getBlankGame({ id: 'dce6b11e', user });

export default {
  component: FlatrisGame,

  container: {
    width: 16,
    height: 24
  },

  reduxState: {
    curUser: user,
    curGame: game
  },

  init({ compRef }: { compRef: ElementRef<typeof Component> }) {
    compRef.context.store.dispatch({
      type: 'PLAYER_READY',
      payload: {
        gameId: game.id,
        userId: user.id
      }
    });
  }
};
