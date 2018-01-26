// @flow

import React, { Component } from 'react';
import { getPlayer } from '../../reducers/game';

import type { Node } from 'react';
import type { User, Game } from '../../types/state';

type Props = {
  curUser: User,
  game: Game,
  children: ?Node
};

class Flash extends Component<Props> {
  render() {
    const { children, curUser, game } = this.props;
    const curPlayer = getPlayer(game, curUser.id);

    const classesYay = ['flash'];
    if (curPlayer.flashYay) {
      classesYay.push(`yay-${curPlayer.flashYay}`);
    }

    const classesNay = ['flash'];
    if (curPlayer.flashNay) {
      classesNay.push(`nay-${curPlayer.flashNay}`);
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
