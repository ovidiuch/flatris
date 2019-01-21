// @flow

import React, { Component } from 'react';
import FadeIn from '../../effects/FadeIn';

import type { Node } from 'react';

type Props = {
  title: Node,
  message: Node,
  actions: Array<Node>
};

export default class Screen extends Component<Props> {
  static defaultProps = {
    actions: []
  };

  render() {
    const { title, message, actions } = this.props;

    return (
      <div className="screen">
        <FadeIn>
          <h2 className="title">{title}</h2>
          <div className="message">{message}</div>
        </FadeIn>
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
          }

          .title {
            position: absolute;
            top: calc(100% / 20);
            margin: 0;
            padding: 0;
            font-size: 2.2em;
            line-height: 2.2em;
            font-weight: 600;
            white-space: nowrap;
            opacity: 0.7;
          }

          .message {
            position: absolute;
            top: calc(100% / 20 * 5);
            left: 0;
            right: 0;
            height: calc(100% / 20 * 11);
            margin: 0;
            padding: 0;
          }

          .message :global(p) {
            margin: 1em 0;
            margin-top: 0;
            font-size: 1.3em;
            line-height: 1.4em;
            white-space: nowrap;
          }

          .message :global(a) {
            color: #34495f;
          }

          .message :global(small) {
            font-size: 0.8em;
            opacity: 0.8;
          }

          .message :global(.highlight) {
            background: rgba(245, 228, 129, 1);
            padding: 0.15em 0;
          }

          .actions {
            position: absolute;
            top: calc(100% / 20 * 17);
            left: 0;
            right: 0;
            height: calc(100% / 20 * 2);
            font-size: 1.1em;
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
