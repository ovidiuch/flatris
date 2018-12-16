// @flow

import React, { Component } from 'react';
import { getCurPlayer, getOtherPlayer } from 'shared/reducers/game';
import Well from './Well';
import GamePanel from './GamePanel';
import Flash from './effects/Flash';
import Quake from './effects/Quake';

import type { Node } from 'react';
import type { User, Player, Game } from 'shared/types/state';

type Props = {
  curUser: ?User,
  game: Game,
  screen?: Node,
  onSelectP2?: Function,
  showFooter?: boolean
};

class GamePreview extends Component<Props> {
  static defaultProps = {
    showFooter: false
  };

  render() {
    const { curUser, game, screen, onSelectP2, showFooter } = this.props;
    const curPlayer = getCurPlayer(game, curUser);
    const otherPlayer = getOtherPlayer(game, curPlayer);

    return (
      <Quake player1={curPlayer} player2={otherPlayer}>
        <div className="well-container">
          {otherPlayer && (
            <div className="enemy-well">{this.renderWell(otherPlayer)}</div>
          )}
          <Flash player={curPlayer}>{this.renderWell(curPlayer)}</Flash>
        </div>
        {screen}
        <div className="side-container">
          <GamePanel
            curUser={curUser}
            game={game}
            onSelectP2={onSelectP2}
            showFooter={showFooter}
          />
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
      </Quake>
    );
  }

  renderWell(player: Player) {
    const {
      grid,
      blocksCleared,
      blocksPending,
      activeTetromino,
      activeTetrominoGrid,
      activeTetrominoPosition
    } = player;

    return (
      <Well
        grid={grid}
        blocksCleared={blocksCleared}
        blocksPending={blocksPending}
        activeTetromino={activeTetromino}
        activeTetrominoGrid={activeTetrominoGrid}
        activeTetrominoPosition={activeTetrominoPosition}
      />
    );
  }
}

export default GamePreview;
