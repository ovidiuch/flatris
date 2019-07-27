// @flow

import React, { Fragment, Component } from 'react';
import Button from '../../Button';
import Screen from '../shared/Screen';

type Props = {
  disabled: boolean,
  onWatch: Function,
  onJoin: Function
};

export default class JoinGame extends Component<Props> {
  render() {
    const { disabled, onWatch, onJoin } = this.props;

    return (
      <Screen
        title="Join game"
        message={
          <Fragment>
            <p>
              <strong>Room for one more!</strong>
            </p>
            <p>
              You can watch, or
              <br />
              you can play.
            </p>
            <p>What will it be?</p>
          </Fragment>
        }
        actions={[
          <Button disabled={disabled} onClick={onJoin}>
            Join
          </Button>,
          <Button
            disabled={disabled}
            bgColor="#fff"
            color="#34495f"
            colorDisabled="rgba(52, 73, 95, 0.6)"
            onClick={onWatch}
          >
            Watch
          </Button>
        ]}
      />
    );
  }
}
