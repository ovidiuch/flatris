// @flow

import React, { useState, useContext, useEffect } from 'react';
import { ReactReduxContext } from 'react-redux';
import { FixtureContext } from 'react-cosmos-fixture';
import { createStore } from '../store';

import type { Node } from 'react';
import type { State } from 'shared/types/state';

type Props = {
  children: Node,
  state: $Shape<State>
};

// TODO: Differentiate between Redux provider in primary vs secondary renderers
export function ReduxProviderMock({ children, state: mockedState }: Props) {
  const { fixtureState, setFixtureState } = useContext(FixtureContext);
  const initialState = (fixtureState && fixtureState.redux) || mockedState;
  const [contextValue, setContextValue] = useCreateContextValue(initialState);
  useStoreSubscribe(contextValue.store, setContextValue);
  useUpdateReduxFixtureState(contextValue.store, setFixtureState);

  return (
    <ReactReduxContext.Provider value={contextValue}>
      {children}
    </ReactReduxContext.Provider>
  );
}

ReduxProviderMock.cosmosCapture = false;

function useCreateContextValue(initialState) {
  return useState(() => {
    const store = createStore(initialState);
    return {
      storeState: store.getState(),
      store
    };
  });
}

function useStoreSubscribe(store, setContextValue) {
  useEffect(() => {
    return store.subscribe(() => {
      setContextValue({
        storeState: store.getState(),
        store
      });
    });
  }, []);
}

function useUpdateReduxFixtureState(store, setFixtureState) {
  useEffect(
    () => {
      setFixtureState(fixtureState => ({
        ...fixtureState,
        redux: store.getState()
      }));
    },
    [store.getState()]
  );
}
