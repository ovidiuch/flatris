// @flow

import React, { Component } from 'react';
import { getPlayer, getEnemyPlayer } from '../../reducers/game';

import type { Node } from 'react';
import type { User, Game } from '../../types/state';

type Props = {
  curUser: User,
  game: Game,
  children: ?Node
};

class Quake extends Component<Props> {
  render() {
    const { children, curUser, game } = this.props;

    const curPlayer = getPlayer(game, curUser.id);
    const classesOuter = ['quake'];
    if (curPlayer.quake) {
      classesOuter.push(`quake-${curPlayer.quake}`);
    }

    const enemy = getEnemyPlayer(game, curUser.id);
    const classesInner = ['quake'];
    if (enemy && enemy.quake) {
      classesOuter.push(`quake-${enemy.quake}`);
    }

    return (
      <div className={classesOuter.join(' ')}>
        <div className={classesInner.join(' ')}>{children}</div>
        <style jsx>{`
          .quake {
            position: absolute;
            top: 0;
            bottom: 0;
            left: 0;
            right: 0;
          }

          .quake-a1 {
            animation: quakeA1 0.5s ease-out;
            transform: translate3d(0, 0, 0);
          }
          .quake-a2 {
            animation: quakeA2 0.5s ease-out;
            transform: translate3d(0, 0, 0);
          }
          .quake-a3 {
            animation: quakeA3 0.5s ease-out;
            transform: translate3d(0, 0, 0);
          }
          .quake-a4 {
            animation: quakeA4 0.5s ease-out;
            transform: translate3d(0, 0, 0);
          }
          .quake-b1 {
            animation: quakeB1 0.5s ease-out;
            transform: translate3d(0, 0, 0);
          }
          .quake-b2 {
            animation: quakeB2 0.5s ease-out;
            transform: translate3d(0, 0, 0);
          }
          .quake-b3 {
            animation: quakeB3 0.5s ease-out;
            transform: translate3d(0, 0, 0);
          }
          .quake-b4 {
            animation: quakeB4 0.5s ease-out;
            transform: translate3d(0, 0, 0);
          }
          @keyframes quakeA1 {
            12.5% {
              transform: translate3d(0, -0.25px, 0);
            }
            25% {
              transform: translate3d(0, 0.5px, 0);
            }
            37.5% {
              transform: translate3d(0, -1px, 0);
            }
            50% {
              transform: translate3d(0, 1px, 0);
            }
            62.5% {
              transform: translate3d(0, -1px, 0);
            }
            75% {
              transform: translate3d(0, 0.5px, 0);
            }
            87.5% {
              transform: translate3d(0, -0.25px, 0);
            }
          }
          @keyframes quakeA2 {
            12.5% {
              transform: translate3d(0, -0.5px, 0);
            }
            25% {
              transform: translate3d(0, 1px, 0);
            }
            37.5% {
              transform: translate3d(0, -2px, 0);
            }
            50% {
              transform: translate3d(0, 2px, 0);
            }
            62.5% {
              transform: translate3d(0, -2px, 0);
            }
            75% {
              transform: translate3d(0, 1px, 0);
            }
            87.5% {
              transform: translate3d(0, -0.5px, 0);
            }
          }
          @keyframes quakeA3 {
            12.5% {
              transform: translate3d(0, -0.75px, 0);
            }
            25% {
              transform: translate3d(0, 1.5px, 0);
            }
            37.5% {
              transform: translate3d(0, -3px, 0);
            }
            50% {
              transform: translate3d(0, 3px, 0);
            }
            62.5% {
              transform: translate3d(0, -3px, 0);
            }
            75% {
              transform: translate3d(0, 1.5px, 0);
            }
            87.5% {
              transform: translate3d(0, -0.75px, 0);
            }
          }
          @keyframes quakeA4 {
            12.5% {
              transform: translate3d(0, -1px, 0);
            }
            25% {
              transform: translate3d(0, 2px, 0);
            }
            37.5% {
              transform: translate3d(0, -4px, 0);
            }
            50% {
              transform: translate3d(0, 4px, 0);
            }
            62.5% {
              transform: translate3d(0, -4px, 0);
            }
            75% {
              transform: translate3d(0, 2px, 0);
            }
            87.5% {
              transform: translate3d(0, -1px, 0);
            }
          }
          @keyframes quakeB1 {
            12.5% {
              transform: translate3d(0, -0.25px, 0);
            }
            25% {
              transform: translate3d(0, 0.5px, 0);
            }
            37.5% {
              transform: translate3d(0, -1px, 0);
            }
            50% {
              transform: translate3d(0, 1px, 0);
            }
            62.5% {
              transform: translate3d(0, -1px, 0);
            }
            75% {
              transform: translate3d(0, 0.5px, 0);
            }
            87.5% {
              transform: translate3d(0, -0.25px, 0);
            }
          }
          @keyframes quakeB2 {
            12.5% {
              transform: translate3d(0, -0.5px, 0);
            }
            25% {
              transform: translate3d(0, 1px, 0);
            }
            37.5% {
              transform: translate3d(0, -2px, 0);
            }
            50% {
              transform: translate3d(0, 2px, 0);
            }
            62.5% {
              transform: translate3d(0, -2px, 0);
            }
            75% {
              transform: translate3d(0, 1px, 0);
            }
            87.5% {
              transform: translate3d(0, -0.5px, 0);
            }
          }
          @keyframes quakeB3 {
            12.5% {
              transform: translate3d(0, -0.75px, 0);
            }
            25% {
              transform: translate3d(0, 1.5px, 0);
            }
            37.5% {
              transform: translate3d(0, -3px, 0);
            }
            50% {
              transform: translate3d(0, 3px, 0);
            }
            62.5% {
              transform: translate3d(0, -3px, 0);
            }
            75% {
              transform: translate3d(0, 1.5px, 0);
            }
            87.5% {
              transform: translate3d(0, -0.75px, 0);
            }
          }
          @keyframes quakeB4 {
            12.5% {
              transform: translate3d(0, -1px, 0);
            }
            25% {
              transform: translate3d(0, 2px, 0);
            }
            37.5% {
              transform: translate3d(0, -4px, 0);
            }
            50% {
              transform: translate3d(0, 4px, 0);
            }
            62.5% {
              transform: translate3d(0, -4px, 0);
            }
            75% {
              transform: translate3d(0, 2px, 0);
            }
            87.5% {
              transform: translate3d(0, -1px, 0);
            }
          }
        `}</style>
      </div>
    );
  }
}

export default Quake;
