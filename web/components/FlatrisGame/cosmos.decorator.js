// @flow

import React from 'react';
import { getBlankGame } from 'shared/reducers/game';
import { getSampleUser } from '../../utils/test-helpers';
import { FlatrisReduxMock } from '../../mocks/ReduxMock';
import { SocketProviderMock } from '../../mocks/SocketProviderMock';

import type { Node } from 'react';

const user = getSampleUser();
const game = getBlankGame({ id: 'dce6b11e', user });

const state = {
  jsReady: true,
  curUser: user,
  games: {
    [game.id]: game
  },
  curGame: game.id
};

export default ({ children }: { children: Node }) => (
  <FlatrisReduxMock initialState={state}>
    <SocketProviderMock>{children}</SocketProviderMock>
  </FlatrisReduxMock>
);
