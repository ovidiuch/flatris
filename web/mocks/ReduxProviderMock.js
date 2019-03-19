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

// TODO: s/ReduxProviderMock/ReduxMock
export function ReduxProviderMock({ children, state: mockedState }: Props) {
  const { fixtureState, setFixtureState } = useContext(FixtureContext);

  const [contextValue, setContextValue] = useState(() => {
    const initialState = fixtureState.redux
      ? fixtureState.redux.state
      : mockedState;
    return createContextValue(initialState, getChangeTime());
  });

  useReduxSubscribe(contextValue.store, setContextValue);
  useSyncFixtureState(contextValue, setFixtureState);
  useSyncLocalState(contextValue, fixtureState, setContextValue);

  return (
    <ReactReduxContext.Provider value={contextValue}>
      {children}
    </ReactReduxContext.Provider>
  );
}

ReduxProviderMock.cosmosCapture = false;

function useReduxSubscribe(store, setContextValue) {
  useEffect(
    () =>
      store.subscribe(() => {
        setContextValue({
          changedAt: getChangeTime(),
          storeState: store.getState(),
          store
        });
      }),
    [store]
  );
}

function useSyncFixtureState(contextValue, setFixtureState) {
  useEffect(
    () => {
      setFixtureState(fixtureState => ({
        ...fixtureState,
        redux: {
          changedAt: contextValue.changedAt,
          state: contextValue.storeState
        }
      }));
    },
    [contextValue.changedAt]
  );
}

function useSyncLocalState(contextValue, fixtureState, setContextValue) {
  useEffect(
    () => {
      if (fixtureState.redux) {
        const { changedAt, state } = fixtureState.redux;
        if (changedAt > contextValue.changedAt) {
          setContextValue(createContextValue(state, changedAt));
        }
      }
    },
    [fixtureState.redux, contextValue.changedAt]
  );
}

function createContextValue(reduxState, changedAt) {
  const store = createStore(reduxState);
  return {
    changedAt,
    storeState: store.getState(),
    store
  };
}

function getChangeTime() {
  return Date.now();
}
