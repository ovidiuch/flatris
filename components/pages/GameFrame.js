// @flow

import React, { Component } from 'react';
import GameContainer from '../GameContainer';
import GamePanel from '../GamePanel';

import type { Node } from 'react';

type Props = {
  children: Node
};

export default class GameFrame extends Component<Props> {
  render() {
    const { children } = this.props;

    return (
      <GameContainer>
        <div className="screen-container">{children}</div>
        <div className="side-container">
          <GamePanel curUser={null} game={null} />
        </div>
        <style jsx>{`
          .screen-container {
            position: absolute;
            top: 0;
            bottom: 0;
            left: 0;
            right: calc(100% / 16 * 6);
            background: rgba(236, 240, 241, 0.85);
          }
          .side-container {
            position: absolute;
            top: 0;
            bottom: 0;
            right: 0;
            left: calc(100% / 16 * 10);
            background: #fff;
          }
        `}</style>
      </GameContainer>
    );
  }
}
