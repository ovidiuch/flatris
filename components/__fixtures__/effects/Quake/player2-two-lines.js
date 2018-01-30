// @flow

import React from 'react';
import { getSampleUser, getSampleUser2 } from '../../../../utils/test-helpers';
import { getBlankPlayer } from '../../../../reducers/game';
import Quake from '../../../effects/Quake';

const user1 = getSampleUser();
const player1 = getBlankPlayer(1337, user1);

const user2 = getSampleUser2();
const player2 = {
  ...getBlankPlayer(1337, user2),
  quake: 'a2'
};

export default {
  component: Quake,
  props: {
    player1,
    player2
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
