// @flow

import React, { Component } from 'react';

import type { Node } from 'react';

type Props = {
  children: ?Node
};

export default class FadeIn extends Component<Props> {
  render() {
    const { children } = this.props;

    return (
      <div className="fade-in">
        {children}
        <style jsx>{`
          .fade-in {
            opacity: 0;
            animation-name: fadeIn;
            animation-duration: 0.5s;
            animation-delay: 0.1s;
            animation-fill-mode: forwards;
          }

          @keyframes fadeIn {
            0% {
              opacity: 0;
            }
            100% {
              opacity: 1;
            }
          }
        `}</style>
      </div>
    );
  }
}
