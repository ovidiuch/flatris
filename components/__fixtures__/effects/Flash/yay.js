// @flow

import { getSampleUser } from '../../../../utils/user';
import { getBlankGame, updatePlayer } from '../../../../reducers/game';
import WellEffects from '../../../effects/Flash';

const user = getSampleUser();
const game = getBlankGame({ id: 1337, user });

export default {
  component: WellEffects,
  props: {
    curUser: user,
    game: updatePlayer(game, user.id, {
      flashYay: 'a'
    })
  },
  children: 'Yuhuu!'
};
