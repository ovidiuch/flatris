// @flow

import { createFixture } from 'react-cosmos';
import { getSampleUser } from '../../../utils/test-helpers';
import { getBlankGame } from 'shared/reducers/game';
import GamePanel from '../../GamePanel';

const user = getSampleUser();
const game = getBlankGame({ id: 'dce6b11e', user });

export default createFixture({
  component: GamePanel,

  container: {
    width: 6
  },

  props: {
    curUser: user,
    game,
    onSelectP2: () => console.log('Select P2')
  }
});
