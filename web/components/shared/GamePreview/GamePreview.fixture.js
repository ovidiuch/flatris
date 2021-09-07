// @flow

import React from 'react';
import { getBlankGame } from 'shared/reducers/game';
import { getSampleUser } from '../../../utils/test-helpers';
import { GameContainerMock } from '../../../mocks/GameContainerMock';
import GamePreview from './GamePreview';

const user = getSampleUser();
const game = getBlankGame({ id: 'dce6b11e', user });

export default (
  <GameContainerMock>
    <GamePreview
      curUser={user}
      game={game}
      onSelectP2={() => console.log('Select P2')}
    />
  </GameContainerMock>
);
