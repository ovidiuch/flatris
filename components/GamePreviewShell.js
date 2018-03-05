// @flow

import React, { Fragment, Component } from 'react';
import GamePanel from './GamePanel';

type Props = {};

class GamePreviewShell extends Component<Props> {
  render() {
    return (
      <Fragment>
        <div className="well-container" />
        <div className="side-container">
          <GamePanel curUser={null} game={null} />
        </div>
        <style jsx>{`
          .well-container {
            position: absolute;
            top: 0;
            bottom: 0;
            left: 0;
            right: calc(100% / 16 * 6);
            background: #ecf0f1;
          }

          .enemy-well {
            position: absolute;
            top: 0;
            bottom: 0;
            left: 0;
            right: 0;
            opacity: 0.15;
            filter: grayscale(80%);
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
      </Fragment>
    );
  }
}

export default GamePreviewShell;
