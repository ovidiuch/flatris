// @flow

import React, { Component } from 'react';

import type { Node } from 'react';

type Props = {
  time: ?number,
  children: Node
};

export default class Shake extends Component<Props> {
  render() {
    const { children, time } = this.props;

    if (!time) {
      return children;
    }

    return (
      <div className="shake" key={time}>
        {children}
        <style jsx>{`
          .shake {
            position: absolute;
            top: 0;
            bottom: 0;
            left: 0;
            right: 0;
            transform: translate3d(0, 0, 0);
            animation: shake 0.5s ease-out;
          }

          @keyframes shake {
            12.5% {
              transform: translate3d(2px, -1px, 0);
            }
            25% {
              transform: translate3d(-4px, 2px, 0);
            }
            37.5% {
              transform: translate3d(4px, -4px, 0);
            }
            50% {
              transform: translate3d(-4px, 4px, 0);
            }
            62.5% {
              transform: translate3d(2px, -4px, 0);
            }
            75% {
              transform: translate3d(-1px, 2px, 0);
            }
            87.5% {
              transform: translate3d(-1px, -1px, 0);
            }
          }
        `}</style>
      </div>
    );
  }
}
