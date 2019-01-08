// @flow

import React, { Component } from 'react';
import { SHAPES, COLORS } from 'shared/constants/tetromino';
import { getCurPlayer, allPlayersReady } from 'shared/reducers/game';
import Tetromino from '../Tetromino';
import PlayerInfo from '../PlayerInfo';

import type { User, Game } from 'shared/types/state';

type Props = {
  curUser: ?User,
  game: ?Game,
  onSelectP2?: Function,
  showFooter?: boolean
};

export default class GamePanel extends Component<Props> {
  static defaultProps = {
    showFooter: false
  };

  /**
   * The game panel contains:
   * - The logo
   * - The next Tetromino for the current player
   * - The name and score for each player
   * - Footer with credits
   */
  render() {
    const { game, onSelectP2, showFooter } = this.props;
    const player1 = game && game.players[0];
    const player2 = game && game.players[1];
    const nextTetromino = this.getNextTetromino();
    const showP1ReadyState = showPlayerReadyState(game, true);
    const showP2ReadyState = showPlayerReadyState(game, false);

    return (
      <div className="game-panel">
        <div className="title">
          <h1>Flatris</h1>
        </div>
        <div className="next-label">Next</div>
        <div className={getNextTetrominoClass(nextTetromino)}>
          <Tetromino
            key={nextTetromino}
            color={game ? COLORS[nextTetromino] : '#ecf0f1'}
            grid={SHAPES[nextTetromino]}
          />
        </div>
        <div className="player1">
          <PlayerInfo
            player={player1}
            wins={player2 && player2.losses}
            isPlayer1
            showReadyState={showP1ReadyState}
          />
        </div>
        <div className="player2">
          <PlayerInfo
            player={player2}
            wins={player1 && player2 && player1.losses}
            isPlayer1={false}
            showReadyState={showP2ReadyState}
            onSelect={onSelectP2}
          />
        </div>
        {showFooter && (
          <div className="footer">
            By{' '}
            <a href="https://twitter.com/skidding" target="_blank">
              skidding
            </a>
          </div>
        )}
        <style jsx>{`
          .game-panel {
            position: absolute;
            top: 0;
            bottom: 0;
            left: 0;
            right: 0;
          }

          .game-panel > div {
            position: absolute;
            left: calc(100% / 6);
            width: calc(100% / 6 * 4);
          }

          .title {
            top: calc(100% / 20);
          }

          .title h1 {
            margin: 0;
            padding: 0;
            color: #34495f;
            font-size: 2.8em;
            font-family: 'Teko', sans-serif;
            font-weight: 400;
            line-height: 1.3em;
            text-transform: uppercase;
            letter-spacing: 0.02em;
          }

          .next-label {
            top: calc(100% / 20 * 4);
            margin-top: -0.25em;
            color: rgba(155, 164, 171, 0.8); /* #9ba4ab */
            font-family: 'Teko', sans-serif;
            font-weight: 300;
            font-size: 1.8em;
            line-height: 1em;
            letter-spacing: 0.02em;
            text-transform: uppercase;
          }

          .next-tetromino {
            top: calc(100% / 20 * 5);
            height: calc(100% / 20 * 4);
          }

          /* The I Tetromino needs to be lifted a bit because it has an empty row
            in its default position */
          .next-tetromino-I {
            transform: translate(0, -25%);
          }

          .player1 {
            position: absolute;
            top: calc(100% / 20 * 8);
            height: calc(100% / 20 * 4);
          }

          .player2 {
            position: absolute;
            top: calc(100% / 20 * 13);
            height: calc(100% / 20 * 4);
          }

          .footer {
            position: absolute;
            top: calc(100% / 20 * 18);
            height: calc(100% / 20);
            color: rgba(155, 164, 171, 0.8); /* #9ba4ab */
            font-family: 'Teko', sans-serif;
            font-weight: 300;
            font-size: 1.8em;
            line-height: 1.2em;
            letter-spacing: 0.02em;
            text-transform: uppercase;
            text-align: center;
            white-space: nowrap;
          }
          .footer a {
            color: #9ba4ab;
          }
        `}</style>
      </div>
    );
  }

  getNextTetromino(): Tetromino {
    const { curUser, game } = this.props;

    if (!game) {
      return 'S';
    }

    const curPlayer = getCurPlayer(game, curUser);
    const { nextTetromino } = curPlayer;

    return nextTetromino;
  }
}

function getNextTetrominoClass(tetromino: Tetromino) {
  // We use this extra class to position tetrominoes differently from CSS
  // based on their type
  return `next-tetromino next-tetromino-${tetromino}`;
}

function showPlayerReadyState(game: ?Game, isPlayer1: boolean): boolean {
  if (!game || allPlayersReady(game)) {
    return false;
  }

  const player1 = game.players[0];
  if (isPlayer1 && player1.status === 'READY') {
    return true;
  }

  const player2 = game.players[1];
  if (!isPlayer1 && player2 && player2.status === 'READY') {
    return true;
  }

  return false;
}
