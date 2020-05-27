// @flow

import React from 'react';
import { GameContainerMock } from '../../../mocks/GameContainerMock';

export default ({ children }: { children: React$Node }) => (
  <GameContainerMock cols={8} rows={8}>
    {children}
  </GameContainerMock>
);
