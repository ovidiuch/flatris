// @flow

import React, { Fragment, Component } from 'react';
import Screen from './Screen';
import Button from '../Button';

export type Props = {
  onWatch: Function,
  onJoin: Function
};

export default class JoinGame extends Component<Props> {
  render() {
    const { onWatch, onJoin } = this.props;

    return (
      <Screen
        title="Join game"
        message={
          <Fragment>
            <p>
              <strong>Room for one more!</strong>
            </p>
            <p>
              You can watch, or<br />you can play.
            </p>
            <p>What will it be?</p>
          </Fragment>
        }
        actions={[
          <Button onClick={onJoin}>Join</Button>,
          <Button bgColor="#fff" color="#34495f" onClick={onWatch}>
            Watch
          </Button>
        ]}
      />
    );
  }
}
