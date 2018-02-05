// @flow

import React, { Fragment, Component } from 'react';
import Button from '../Button';
import Screen from './Screen';

export type Props = {
  onReady: Function
};

export default class GetReady extends Component<Props> {
  render() {
    const { onReady } = this.props;

    return (
      <Screen
        title="Get ready..."
        message={
          <Fragment>
            <p>
              Game starts when<br />you're both ready.
            </p>
            <p>
              <strong>Good luck!</strong>
            </p>
          </Fragment>
        }
        actions={[<Button onClick={onReady}>Ready</Button>]}
      />
    );
  }
}
