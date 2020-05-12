// @flow

import React from 'react';
import { GameContainerMock } from '../../mocks/GameContainerMock';

export default ({ children }: { children: React$Node }) => (
  <GameContainerMock cols={4} rows={4}>
    {children}
  </GameContainerMock>
);
