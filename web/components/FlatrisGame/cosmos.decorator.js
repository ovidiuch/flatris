// @flow

import React from 'react';
import { Provider } from 'react-redux';
import { getBlankGame } from 'shared/reducers/game';
import { getSampleUser } from '../../utils/test-helpers';
import { createStore } from '../../store';
import { SocketProvider } from '../../mocks/SocketProvider';

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
  <Provider store={createStore(state)}>
    <SocketProvider>{children}</SocketProvider>
  </Provider>
);
