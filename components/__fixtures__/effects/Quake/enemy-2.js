// @flow

import React from 'react';
import { getSampleUser, getSampleUser2 } from '../../../../utils/user';
import {
  getBlankGame,
  addUserToGame,
  updatePlayer
} from '../../../../reducers/game';
import WellEffects from '../../../effects/Quake';

const user = getSampleUser();
let game = getBlankGame({ id: 1337, user });

// Add 2nd player to game state
const user2 = getSampleUser2();
game = addUserToGame(game, user2);

export default {
  component: WellEffects,
  props: {
    curUser: user,
    game: updatePlayer(game, user2.id, {
      quake: 'a2'
    })
  },
  children: (
    <div>
      Jump around, jump up and get down<br />
      Jump around, jump around<br />
      Jump up and get down<br />
      Jump up, jump up and get down<br />
      Jump, jump
    </div>
  )
};
