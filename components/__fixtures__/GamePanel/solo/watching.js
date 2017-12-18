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
          status: 'WATCHING'
        }
      ]
    },
    userId: 1,
    showMenuButton: false,
    onMenu: () => console.log('Show menu')
  }
};

export default fixture;
