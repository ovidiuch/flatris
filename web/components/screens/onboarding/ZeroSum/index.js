// @flow

import React, { Component, Fragment } from 'react';
import Button from '../../../shared/Button';
import Screen from '../../shared/Screen';

type Props = {
  onNext: Function,
};

export default class ZeroSum extends Component<Props> {
  render() {
    const { onNext } = this.props;

    return (
      <Screen
        title="Zero sum"
        message={
          <Fragment>
            <p>
              <span className="highlight">
                Every line you clear is
                <br />
                added to your opponent
                <br />
                and vice versa.
              </span>
            </p>
            <p>
              <strong>
                This is not a friendly
                <br />
                match.
              </strong>{' '}
              One player's
              <br />
              loss is the other's win!
            </p>
            <p>Play fast to survive.</p>
          </Fragment>
        }
        actions={[<Button onClick={onNext}>Aha!</Button>]}
      />
    );
  }
}
