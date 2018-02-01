// @flow

import React, { Fragment, Component } from 'react';
import Screen from './Screen';
import Button from '../Button';

export type Props = {
  onPlay: Function
};

export default class NewGame extends Component<Props> {
  render() {
    const { onPlay } = this.props;

    return (
      <Screen
        title="New game..."
        message={
          <Fragment>
            <p>
              <strong>
                Invite a friend to<br />battle, or play solo.
              </strong>
            </p>
            <p>
              Either way, you can<br />warm up until the<br />other person
              arrives.
            </p>
          </Fragment>
        }
        actions={[<Button onClick={onPlay}>Play</Button>]}
      />
    );
  }
}
