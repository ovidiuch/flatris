// @flow

import React, { Fragment, Component } from 'react';
import Link from 'next/link';
import Shake from '../../effects/Shake';
import FadeIn from '../../effects/FadeIn';
import Button from '../../Button';
import Screen from '../shared/Screen';

import type { Player } from 'shared/types/state';

type Props = {
  disabled: boolean,
  curPlayer: Player,
  onPing: Function
};

type LocalState = {
  isOtherPlayerIdle: boolean
};

export default class WaitingForOther extends Component<Props, LocalState> {
  timeoutId: ?TimeoutID;

  state = {
    isOtherPlayerIdle: false
  };

  componentDidMount() {
    this.timeoutId = setTimeout(() => {
      this.setState({
        isOtherPlayerIdle: true
      });
    }, 30000);
  }

  componentWillUnmount() {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }
  }

  render() {
    const { disabled, curPlayer, onPing } = this.props;
    const { isOtherPlayerIdle } = this.state;

    return (
      <Screen
        title="Waiting..."
        message={
          <Fragment>
            <p>
              Your friend is a bit
              <br />
              slower. I know...
            </p>
            <p>
              <strong>Ping them to hurry!</strong>
            </p>
            {isOtherPlayerIdle && (
              <FadeIn>
                <p>
                  Maybe your friend
                  <br />
                  left you hanging.
                  <br />
                  <Link href="/">
                    <a>Join another game?</a>
                  </Link>
                </p>
              </FadeIn>
            )}
          </Fragment>
        }
        actions={[
          <Shake time={curPlayer.ping}>
            <Button disabled={disabled} onClick={onPing}>
              Ping
            </Button>
          </Shake>
        ]}
      />
    );
  }
}
