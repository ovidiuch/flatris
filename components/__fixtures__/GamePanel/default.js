// @flow

import { getSampleUser } from '../../../utils/user';
import { getBlankGame } from '../../../reducers/game';
import GamePanel from '../../GamePanel';

import type { Props } from '../../GamePanel';

const fixture: { props: Props } = {
  component: GamePanel,

  props: {
    curUser: getSampleUser(),
    game: getBlankGame({ activeTetrimono: 'S', nextTetrimino: 'S' }),
    onMenu: () => console.log('Show menu')
  }
};

export default fixture;
