// @flow

import React from 'react';
import { GameContainerMock } from '../../../../mocks/GameContainerMock';
import Logo from '.';

export default {
  dark: (
    <GameContainerMock cols={6} rows={4}>
      <Logo />
    </GameContainerMock>
  ),
  light: (
    <GameContainerMock cols={6} rows={4}>
      <Logo color="#ecf0f1" />
    </GameContainerMock>
  ),
};
