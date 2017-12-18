// @flow

import GameLobby from '../../GameLobby';
import { getBlankGame } from '../../../../reducers/game';

import type { Props } from '../../GameLobby';

const fixture: { props: Props } = {
  component: GameLobby,
  props: {
    game: {
      ...getBlankGame('S', 'S'),
      maxPlayers: 3,
      users: [{ id: 1, status: 'PLAYING' }, { id: 2, status: 'PLAYING' }]
    },
    onView: () => console.log('Just watch'),
    onPlay: () => console.log('Start playin')
  }
};

export default fixture;
