// @flow

import React, { Fragment, Component } from 'react';
import Shake from '../effects/Shake';
import Button from '../Button';
import Screen from './Screen';

import type { Player } from '../../types/state';

type Props = {
  curPlayer: Player,
  onPing: Function
};

export default class WaitingForOther extends Component<Props> {
  render() {
    const { curPlayer, onPing } = this.props;

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
        actions={[
          <Shake time={curPlayer.ping}>
            <Button onClick={onPing}>Ping</Button>
          </Shake>
        ]}
      />
    );
  }
}
