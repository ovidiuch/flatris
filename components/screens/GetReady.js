// @flow

import React, { Fragment, Component } from 'react';
import Shake from '../effects/Shake';
import Button from '../Button';
import Screen from './Screen';

import type { Player } from '../../types/state';

type Props = {
  disabled: boolean,
  otherPlayer: Player,
  onReady: Function
};

export default class GetReady extends Component<Props> {
  render() {
    const { disabled, otherPlayer, onReady } = this.props;

    return (
      <Screen
        title="Get ready"
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
        actions={[
          <Shake time={otherPlayer.ping}>
            <Button disabled={disabled} onClick={onReady}>
              Ready
            </Button>
          </Shake>
        ]}
      />
    );
  }
}
