// @flow

import { Component } from 'react';
import { getSampleUser } from '../../../utils/test-helpers';
import { getBlankGame, getPlayer } from 'shared/reducers/game';
import { getCurGame } from '../../../reducers/cur-game';
import FlatrisGame from '../../FlatrisGame';

import type { ElementRef } from 'react';

const user = getSampleUser();
const game = getBlankGame({ id: 'dce6b11e', user });

export default {
  component: FlatrisGame,

  reduxState: {
    jsReady: true,
    curUser: user,
    games: {
      [game.id]: game
    },
    curGame: game.id
  },

  init({ compRef }: { compRef: ElementRef<typeof Component> }) {
    const { getState, dispatch } = compRef.context.store;

    const prevActionId = getLastActionId(getState, user.id);
    dispatch({
      type: 'PLAYER_READY',
      payload: {
        actionId: prevActionId + 1,
        prevActionId,
        gameId: game.id,
        userId: user.id
      }
    });
  }
};

function getLastActionId(getState, userId) {
  const curGame = getCurGame(getState());
  const { lastActionId } = getPlayer(curGame, userId);

  return lastActionId;
}
