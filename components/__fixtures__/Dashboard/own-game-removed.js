// @flow

import { Component } from 'react';
import { createFixture } from '../../../utils/create-fixture';
import {
  getSampleUser,
  getSampleUser2,
  doAfter
} from '../../../utils/test-helpers';
import { getBlankGame } from '../../../reducers/game';
import Dashboard from '../../Dashboard';

import type { ElementRef } from 'react';

const user1 = getSampleUser();
const user2 = getSampleUser2();
const game1 = getBlankGame({ id: 'dce6b11e', user: user1 });
const game2 = getBlankGame({ id: 'dce6b11f', user: user2 });

export default createFixture({
  component: Dashboard,

  reduxState: {
    jsReady: true,
    curUser: user1,
    games: {
      [game1.id]: game1,
      [game2.id]: game2
    }
  },

  async init({ compRef }: { compRef: ElementRef<typeof Component> }) {
    const { dispatch } = compRef.context.store;

    await doAfter(200, () => {
      dispatch({
        type: 'REMOVE_GAME',
        payload: { gameId: game1.id }
      });
    });
  }
});
