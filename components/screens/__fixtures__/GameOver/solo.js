// @flow

import { getSampleUser } from '../../../../utils/test-helpers';
import { getBlankGame } from '../../../../reducers/game';
import GameOver from '../../GameOver';

import type { Props } from '../../GameOver';

const user = getSampleUser();
let game = getBlankGame({ id: 'd2f', user });

const fixture: { props: Props } = {
  component: GameOver,

  props: {
    curUser: user,
    game,
    onRestart: () => console.log(`Restart!`)
  },

  container: {
    width: 10,
    backgroundColor: 'rgba(236, 240, 241, 0.85)'
  }
};

export default fixture;
