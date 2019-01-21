// @flow

import React, { Fragment, Component } from 'react';
import Screen from '../../shared/Screen';
import Button from '../../../Button';

type Props = {
  onNext: Function
};

export default class Multiplayer extends Component<Props> {
  render() {
    const { onNext } = this.props;

    return (
      <Screen
        title="One vs one"
        message={
          <Fragment>
            <p>
              <span className="highlight">
                Both players receive
                <br />
                the same sequence of
                <br />
                geometric shapes.
              </span>
            </p>
            <p>
              Each of you controls a<br />
              separate game. You see
              <br />
              <strong>your rival's shadow</strong>,<br />
              but you don't interact.
            </p>
            <p>Except in one way...</p>
          </Fragment>
        }
        actions={[<Button onClick={onNext}>OK...</Button>]}
      />
    );
  }
}
