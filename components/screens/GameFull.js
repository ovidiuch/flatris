// @flow

import React, { Fragment, Component } from 'react';
import Link from 'next/link';
import Screen from './Screen';
import Button from '../Button';

export type Props = {
  onWatch: Function
};

export default class GameFull extends Component<Props> {
  render() {
    const { onWatch } = this.props;

    return (
      <Screen
        title="Join game"
        message={
          <Fragment>
            <p>
              <strong>Game full.</strong>
            </p>
            <p>
              You can watch, or<br />
              <Link href="/">
                <a>join another game</a>
              </Link>.
            </p>
          </Fragment>
        }
        actions={[
          <Button disabled>Join</Button>,
          <Button bgColor="#fff" color="#34495f" onClick={onWatch}>
            Watch
          </Button>
        ]}
      />
    );
  }
}