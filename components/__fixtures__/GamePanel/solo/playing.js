// @flow

import { getBlankGame } from '../../../../reducers/game';
import GamePanel from '../../../GamePanel';

import type { Props } from '../../../GamePanel';

const fixture: { props: Props } = {
  component: GamePanel,

  props: {
    game: {
      ...getBlankGame('S', 'S'),
      users: [
        {
          id: 1,
          status: 'PLAYING'
        }
      ],
      activeUserId: 1
    },
    userId: 1,
    showMenuButton: true,
    onMenu: () => console.log('Show menu')
  }
};

export default fixture;
