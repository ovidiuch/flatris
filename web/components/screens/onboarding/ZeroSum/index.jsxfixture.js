// @flow

import React from 'react';
import ZeroSum from '.';
import { GameContainerMock } from '../../../../mocks/GameContainerMock';

export default (
  <GameContainerMock cols={10} backgroundColor="rgba(236, 240, 241, 0.85)">
    <ZeroSum onNext={() => console.log('Next')} />
  </GameContainerMock>
);
