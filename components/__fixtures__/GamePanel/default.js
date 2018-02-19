// @flow

import { getSampleUser } from '../../../utils/test-helpers';
import { getBlankGame } from '../../../reducers/game';
import GamePanel from '../../GamePanel';

import type { Props } from '../../GamePanel';

const user = getSampleUser();
const game = getBlankGame({ id: 'dce6b11e', user });

const fixture: { props: Props } = {
  component: GamePanel,

  container: {
    width: 6
  },

  props: {
    curUser: user,
    game,
    onSelectP2: () => console.log('Select P2')
  }
};

export default fixture;
