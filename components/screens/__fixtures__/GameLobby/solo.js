// @flow

import GameLobby from '../../GameLobby';
import { getBlankGame } from '../../../../reducers/game';

import type { Props } from '../../GameLobby';

const fixture: { props: Props } = {
  component: GameLobby,
  props: {
    game: {
      ...getBlankGame('S', 'S'),
      maxPlayers: 8,
      users: [{ id: 1, status: 'WATCHING' }]
    },
    onWatch: () => console.log('Just watch'),
    onPlay: () => console.log('Start playin')
  }
};

export default fixture;
