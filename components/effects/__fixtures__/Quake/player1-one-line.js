// @flow

import React from 'react';
import { getSampleUser } from '../../../../utils/test-helpers';
import { getBlankPlayer } from '../../../../reducers/game';
import Quake from '../../../effects/Quake';

const user = getSampleUser();
const player1 = {
  ...getBlankPlayer('dce6b11e', user),
  quake: 'a1'
};

export default {
  component: Quake,
  props: {
    player1,
    children: (
      <div>
        I Like To Move It Move It<br />
        I Like To Move It Move It<br />
        I Like To Move It Move<br />
        It Ya Like To (MOVE IT!)
      </div>
    )
  }
};
