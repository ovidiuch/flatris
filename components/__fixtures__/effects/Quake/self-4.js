// @flow

import React from 'react';
import { getSampleUser } from '../../../../utils/user';
import { getBlankGame, updatePlayer } from '../../../../reducers/game';
import WellEffects from '../../../effects/Quake';

const user = getSampleUser();
const game = getBlankGame({ id: 1337, user });

export default {
  component: WellEffects,
  props: {
    curUser: user,
    game: updatePlayer(game, user.id, {
      quake: 'a4'
    })
  },
  children: (
    <div>
      I Like To Move It Move It<br />
      I Like To Move It Move It<br />
      I Like To Move It Move<br />
      It Ya Like To (MOVE IT!)
    </div>
  )
};
