// @flow

import React, { Fragment, Component } from 'react';
import Link from 'next/link';
import Shake from '../effects/Shake';
import FadeIn from '../effects/FadeIn';
import Button from '../Button';
import Screen from './Screen';

import type { Player } from '../../types/state';

type Props = {
  curPlayer: Player,
  onPing: Function
};

type LocalState = {
  isOtherPlayerIdle: boolean
};

export default class WaitingForOther extends Component<Props, LocalState> {
  state = {
    isOtherPlayerIdle: false
  };

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        isOtherPlayerIdle: true
      });
    }, 30000);
  }

  render() {
    const { curPlayer, onPing } = this.props;
    const { isOtherPlayerIdle } = this.state;

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
            {isOtherPlayerIdle && (
              <FadeIn>
                <p>
                  Maybe your friend<br />left you hanging.<br />
                  <Link href="/">Start another game</Link>?
                </p>
              </FadeIn>
            )}
          </Fragment>
        }
        actions={[
          <Shake time={curPlayer.ping}>
            <Button onClick={onPing}>Ping</Button>
          </Shake>
        ]}
      />
    );
  }
}
