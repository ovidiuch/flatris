// @flow

import React from 'react';
import { ReduxMock } from 'react-cosmos-redux';
import { createStore } from '../store';

import type { Node } from 'react';
import type { State } from 'shared/types/state';

type Props = {
  children: Node,
  initialState: $Shape<State>
};

export function FlatrisReduxMock({ children, initialState }: Props) {
  return (
    <ReduxMock configureStore={createStore} initialState={initialState}>
      {children}
    </ReduxMock>
  );
}
