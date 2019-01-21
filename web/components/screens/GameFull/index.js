// @flow

import React, { Fragment, Component } from 'react';
import Link from 'next/link';
import Button from '../../Button';
import Screen from '../shared/Screen';

type Props = {
  disabled: boolean,
  onWatch: Function
};

export default class GameFull extends Component<Props> {
  render() {
    const { disabled, onWatch } = this.props;

    return (
      <Screen
        title="Join game"
        message={
          <Fragment>
            <p>
              <strong>Game full.</strong>
            </p>
            <p>
              You can watch, or
              <br />
              <Link href="/">
                <a>join another game</a>
              </Link>
              .
            </p>
          </Fragment>
        }
        actions={[
          <Button disabled>Join</Button>,
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
