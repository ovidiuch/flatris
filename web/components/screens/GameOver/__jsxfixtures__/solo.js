// @flow

import React from 'react';
import { getSampleUser } from '../../../../utils/test-helpers';
import { getBlankGame } from 'shared/reducers/game';
import GameOver from '..';

const user = getSampleUser();
let game = getBlankGame({ id: 'd2f', user });

export default (
  <GameOver
    disabled={false}
    curUser={user}
    game={game}
    onRestart={() => console.log('Restart')}
  />
);
