// @flow

import React, { Fragment, Component } from 'react';
import Screen from './Screen';
import Button from '../Button';

export type Props = {
  onPing: Function
};

export default class WaitingForOther extends Component<Props> {
  render() {
    const { onPing } = this.props;

    return (
      <Screen
        title="Waiting..."
        message={
          <Fragment>
            <p>
              Your friend is a bit<br />slower. I know...
            </p>
            <p>
              <strong>Ping them to hurry!</strong>
            </p>
          </Fragment>
        }
        actions={[<Button onClick={onPing}>Ping</Button>]}
      />
    );
  }
}
