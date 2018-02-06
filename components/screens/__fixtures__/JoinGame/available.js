// @flow

import { getSampleUser } from '../../../../utils/test-helpers';
import { getBlankGame } from '../../../../reducers/game';
import JoinGame from '../../JoinGame';

import type { Props } from '../../JoinGame';

const user = getSampleUser();
const game = getBlankGame({ id: 'd2f', user });

const fixture: { props: Props } = {
  component: JoinGame,

  props: {
    game,
    onWatch: () => console.log('Just watch'),
    onJoin: () => console.log('Join game')
  },

  container: {
    width: 10,
    gameHeight: true,
    backgroundColor: 'rgba(236, 240, 241, 0.85)'
  }
};

export default fixture;
