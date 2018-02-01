// @flow

import React, { Component } from 'react';
import Button from '../Button';

export type Props = {
  onReady: Function
};

export default class GetReady extends Component<Props> {
  render() {
    const { onReady } = this.props;

    return (
      <div className="screen">
        <h2 className="title">Get ready...</h2>
        <div className="message">
          <p>
            The game will begin<br />you're both ready.
          </p>
          <p>
            <strong>Good luck!</strong>
          </p>
        </div>
        <div className="actions">
          <div className="button" onClick={onReady}>
            <Button>Ready</Button>
          </div>
        </div>
        <style jsx>{`
          .screen {
            position: absolute;
            top: 0;
            bottom: 0;
            left: calc(100% / 10);
            right: calc(100% / 10);
            color: #34495f;
            font-size: 1.1em;
          }

          .title {
            position: absolute;
            top: calc(100% / 20);
            margin: 0;
            padding: 0;
            font-size: 2.2em;
            line-height: 2.1em;
            font-weight: 600;
            white-space: nowrap;
            opacity: 0.7;
          }

          .message {
            position: absolute;
            top: calc(100% / 20 * 5);
            margin: 0;
            padding: 0;
            font-size: 1.2em;
            line-height: 1.3em;
            white-space: nowrap;
          }

          .message p {
            margin-top: 0;
          }

          .actions {
            position: absolute;
            top: calc(100% / 20 * 16);
            left: 0;
            right: 0;
            height: calc(100% / 20 * 2);
          }

          .button {
            position: relative;
            float: right;
            width: 50%;
            height: 100%;
          }
        `}</style>
      </div>
    );
  }
}
