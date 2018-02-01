// @flow

import React, { Component } from 'react';
import type { Node } from 'react';

export type Props = {
  title: Node,
  message: Node,
  actions: Array<Node>
};

export default class Screen extends Component<Props> {
  render() {
    const { title, message, actions } = this.props;

    return (
      <div className="screen">
        <h2 className="title">{title}</h2>
        <div className="message">{message}</div>
        <div className="actions">
          {actions.map((action, i) => (
            <div key={i} className="button">
              {action}
            </div>
          ))}
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

          .message :global(p) {
            margin-top: 0;
          }

          .message :global(a) {
            color: #34495f;
          }

          .actions {
            position: absolute;
            top: calc(100% / 20 * 17);
            left: 0;
            right: 0;
            height: calc(100% / 20 * 2);
          }

          .actions .button {
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
