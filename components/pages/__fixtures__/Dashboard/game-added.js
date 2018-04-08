// @flow

import { createFixture } from 'react-cosmos-flow/fixture';
import { getSampleUser, doAfter } from '../../../../utils/test-helpers';
import { getBlankGame } from '../../../../reducers/game';
import Dashboard from '../../Dashboard';

const user = getSampleUser();
const game1 = getBlankGame({ id: 'dce6b11e', user });

export default createFixture({
  component: Dashboard,

  reduxState: {
    jsReady: true,
    games: {}
  },

  async init({ compRef }) {
    if (!compRef) {
      return;
    }

    const { dispatch } = compRef.context.store;

    await doAfter(200, () => {
      dispatch({
        type: 'ADD_GAME',
        payload: { game: game1 }
      });
    });
  }
});
