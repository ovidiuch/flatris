// @flow

import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { isEqual } from 'lodash';
import { FixtureContext } from 'react-cosmos-fixture';
import { createStore } from '../store';

import type { Node } from 'react';
import type { FixtureContextValue } from 'react-cosmos-fixture';
import type { State } from 'shared/types/state';
import type { FlatrisReduxStore } from '../store';

type Props = {
  children: Node,
  state: $Shape<State>
};

type LocalState = {
  renderKey: number,
  reduxState: void | State
};

// TODO: Upgrade to react-redux@6
export class ReduxProviderMock extends Component<Props, LocalState> {
  static cosmosCapture = false;
  static contextType = FixtureContext;

  // https://github.com/facebook/flow/issues/7166
  context: FixtureContextValue;

  store: FlatrisReduxStore = createStore(this.props.state);
  storeUnsubscribe: void | (() => void);

  state = {
    renderKey: 0,
    reduxState: undefined
  };

  componentDidMount() {
    this.storeUnsubscribe = this.store.subscribe(this.updateFixtureState);
  }

  componentWillUnmount() {
    if (this.storeUnsubscribe) {
      this.storeUnsubscribe();
    }
  }

  componentDidUpdate(prevProps: Props, prevState: LocalState) {
    const localReduxStateChanged = !isEqual(
      this.state.reduxState,
      prevState.reduxState
    );
    if (localReduxStateChanged) {
      return;
    }

    const { fixtureState } = this.context;
    if (
      fixtureState &&
      fixtureState.reduxState &&
      !isEqual(fixtureState.reduxState, this.store.getState())
    ) {
      this.store = createStore(fixtureState.reduxState);
      this.setState({
        renderKey: this.state.renderKey + 1
      });
    }
  }

  render() {
    return (
      <Provider key={this.state.renderKey} store={this.store}>
        {this.props.children}
      </Provider>
    );
  }

  updateFixtureState = () => {
    const reduxState = this.store.getState();
    this.setState({ reduxState }, () => {
      this.context.setFixtureState(fixtureState => {
        return {
          ...fixtureState,
          reduxState
        };
      });
    });
  };
}
