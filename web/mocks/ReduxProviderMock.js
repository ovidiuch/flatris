// @flow

import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore } from '../store';

import type { Node } from 'react';
import type { State } from 'shared/types/state';

type Props = {
  children: Node,
  state: $Shape<State>
};

export class ReduxProviderMock extends Component<Props> {
  store = createStore(this.props.state);

  render() {
    return <Provider store={this.store}>{this.props.children}</Provider>;
  }
}
