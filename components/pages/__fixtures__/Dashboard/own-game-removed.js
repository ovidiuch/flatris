// @flow

import { createFixture } from 'react-cosmos-flow/fixture';
import { getSampleUser, doAfter } from '../../../../utils/test-helpers';
import { getBlankGame } from '../../../../reducers/game';
import Dashboard from '../../Dashboard';

const user1 = getSampleUser();
const game1 = getBlankGame({ id: 'dce6b11e', user: user1 });

export default createFixture({
  component: Dashboard,

  reduxState: {
    jsReady: true,
    curUser: user1,
    games: {
      [game1.id]: game1
    }
  },

  async init({ compRef }) {
    if (!compRef) {
      return;
    }

    const { dispatch } = compRef.context.store;

    await doAfter(200, () => {
      dispatch({
        type: 'REMOVE_GAME',
        payload: { gameId: game1.id }
      });
    });
  }
});
