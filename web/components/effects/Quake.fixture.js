// @flow

import React from 'react';
import Quake from './Quake';
import { getBlankPlayer } from 'shared/reducers/game';
import { getSampleUser } from '../../utils/test-helpers';

const user = getSampleUser();
const player = getBlankPlayer('dce6b11e', user);

const content = (
  <div>
    I Like To Move It Move It
    <br />
    I Like To Move It Move It
    <br />
    I Like To Move It Move
    <br />
    It Ya Like To (MOVE IT!)
  </div>
);

export default {
  'player 1 one line': (
    <Quake player1={{ ...player, quake: 'a1' }} player2={null}>
      {content}
    </Quake>
  ),

  'player 1 four lines': (
    <Quake player1={{ ...player, quake: 'a4' }} player2={null}>
      {content}
    </Quake>
  )
};
