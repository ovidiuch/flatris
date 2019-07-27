// @flow

import React, { Fragment, Component } from 'react';
import Screen from '../../shared/Screen';
import Button from '../../../Button';

type Props = {
  disabled: boolean,
  onNext: Function
};

export default class HowToPlay extends Component<Props> {
  render() {
    const { disabled, onNext } = this.props;

    return (
      <Screen
        title="How to play"
        message={
          <Fragment>
            <p>
              Press <strong>left</strong> or <strong>right</strong> to
              <br />
              move the falling shape.
              <br />
              Press <strong>up</strong> to rotate and
              <br />
              <strong>down</strong> to drop faster.
            </p>
            <p>
              <span className="highlight">
                Use the keyboard on
                <br />
                desktop or the screen
                <br />
                buttons on mobile.
              </span>
            </p>
            <p>Ready to kick ass?</p>
          </Fragment>
        }
        actions={[
          <Button disabled={disabled} onClick={onNext}>
            Got it
          </Button>
        ]}
      />
    );
  }
}
