// @flow

import React from 'react';
import { GameContainerMock } from '../../mocks/GameContainerMock';

export default ({ children }: { children: React$Node }) => (
  <GameContainerMock cols={10} backgroundColor="rgba(236, 240, 241, 0.85)">
    {children}
  </GameContainerMock>
);
