// @flow

import React, { Component, Fragment } from 'react';
import Button from '../../../shared/Button';
import Screen from '../../shared/Screen';

type Props = {
  onNext: Function,
};

export default class FlatrisIntro extends Component<Props> {
  render() {
    const { onNext } = this.props;

    return (
      <Screen
        title="Greetings!"
        message={
          <Fragment>
            <p>
              <span className="highlight">
                Flatris is a fast-paced
                <br />
                two-player game.
                <br />
              </span>
            </p>
            <p>
              <strong>Geometric shapes</strong>
              <br />
              fall from above until
              <br />
              they hit the ground.
            </p>
            <p>
              Place them to{' '}
              <strong>
                form
                <br />
                lines
              </strong>
              , which clears
              <br />
              blocks and buys time!
            </p>
          </Fragment>
        }
        actions={[<Button onClick={onNext}>I see</Button>]}
      />
    );
  }
}
