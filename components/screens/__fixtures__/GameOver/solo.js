// @flow

import { createFixture } from '../../../../utils/create-fixture';
import { getSampleUser } from '../../../../utils/test-helpers';
import { getBlankGame } from '../../../../reducers/game';
import GameOver from '../../GameOver';

const user = getSampleUser();
let game = getBlankGame({ id: 'd2f', user });

export default createFixture({
  component: GameOver,

  props: {
    disabled: false,
    curUser: user,
    game,
    onRestart: () => console.log(`Restart!`)
  },

  container: {
    width: 10,
    backgroundColor: 'rgba(236, 240, 241, 0.85)'
  }
});
