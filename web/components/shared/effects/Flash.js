// @flow

import React, { Component } from 'react';

import type { Node } from 'react';
import type { Player } from 'shared/types/state';

type Props = {
  player: ?Player,
  children: ?Node
};

class Flash extends Component<Props> {
  render() {
    const { children, player } = this.props;
    const classesYay = ['flash'];
    const classesNay = ['flash'];

    if (player) {
      if (player.flashYay) {
        classesYay.push(`yay-${player.flashYay}`);
      }
      if (player.flashNay) {
        classesNay.push(`nay-${player.flashNay}`);
      }
    }

    return (
      <div className={classesYay.join(' ')}>
        <div className={classesNay.join(' ')}>{children}</div>
        <style jsx>{`
          .flash {
            position: absolute;
            top: 0;
            bottom: 0;
            left: 0;
            right: 0;
          }

          .yay-a {
            animation: greenFlashA 0.5s;
          }
          .yay-b {
            animation: greenFlashB 0.5s;
          }
          @keyframes greenFlashA {
            from {
              background: rgba(81, 196, 60, 0.5);
            }
            to {
              background: rgba(81, 196, 60, 0);
            }
          }
          @keyframes greenFlashB {
            from {
              background: rgba(81, 196, 60, 0.5);
            }
            to {
              background: rgba(81, 196, 60, 0);
            }
          }

          .nay-a {
            animation: redFlashA 0.5s;
          }
          .nay-b {
            animation: redFlashB 0.5s;
          }
          @keyframes redFlashA {
            from {
              background: rgba(232, 65, 56, 0.3);
            }
            to {
              background: rgba(232, 65, 56, 0);
            }
          }
          @keyframes redFlashB {
            from {
              background: rgba(232, 65, 56, 0.3);
            }
            to {
              background: rgba(232, 65, 56, 0);
            }
          }
        `}</style>
      </div>
    );
  }
}

export default Flash;
