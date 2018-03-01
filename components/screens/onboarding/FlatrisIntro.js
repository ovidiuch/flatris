// @flow

import React, { Fragment, Component } from 'react';
import Screen from '../Screen';
import Button from '../../Button';

type Props = {
  onNext: Function
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
                <strong>Flatris</strong> is a fast-paced<br />
                two-player puzzle game.<br />
              </span>
            </p>
            <p>
              <strong>Geometric shapes</strong> fall<br />
              from above until they<br />
              hit the ground.
            </p>
            <p>
              Use them to <strong>form lines</strong>,<br />
              which eliminates blocks<br />and buys you time!
            </p>
          </Fragment>
        }
        actions={[<Button onClick={onNext}>I see</Button>]}
      />
    );
  }
}
