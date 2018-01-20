// @flow

import { getSampleUser } from '../../../utils/user';
import { getBlankGame } from '../../../reducers/game';
import GamePanel from '../../GamePanel';

import type { Props } from '../../GamePanel';

const user = getSampleUser();

const fixture: { props: Props } = {
  component: GamePanel,

  props: {
    curUser: user,
    game: getBlankGame({ id: 8989, user }),
    onMenu: () => console.log('Show menu')
  }
};

export default fixture;
