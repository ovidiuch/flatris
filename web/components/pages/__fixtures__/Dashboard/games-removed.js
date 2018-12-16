// @flow

import { createFixture } from 'react-cosmos';
import { getSampleUser, doAfter } from '../../../../utils/test-helpers';
import { getBlankGame } from 'shared/reducers/game';
import Dashboard from '../../Dashboard';

import type { ElementRef } from 'react';

const user = getSampleUser();
const game1 = getBlankGame({ id: 'dce6b11e', user });
const game2 = getBlankGame({ id: 'dce6b110', user });
const game3 = getBlankGame({ id: 'dce6b11b', user });

export default createFixture({
  component: Dashboard,

  reduxState: {
    jsReady: true,
    games: {
      [game1.id]: game1,
      [game2.id]: game2,
      [game3.id]: game3
    }
  },

  async init({ compRef }: { compRef: ElementRef<Dashboard> }) {
    const { dispatch } = compRef.context.store;

    dispatch({
      type: 'REMOVE_GAME',
      payload: { gameId: game1.id }
    });

    await doAfter(500, () => {
      dispatch({
        type: 'REMOVE_GAME',
        payload: { gameId: game2.id }
      });
    });

    await doAfter(500, () => {
      dispatch({
        type: 'REMOVE_GAME',
        payload: { gameId: game3.id }
      });
    });
  }
});
