// @flow

import React, { Component } from 'react';
import classNames from 'classnames';
import { SHAPES, COLORS } from '../constants/tetromino';
import Tetromino from './Tetromino';
import { getPlayer1 } from '../reducers/game';

import type { User, Game } from '../types/state';

export type Props = {
  curUser: ?User,
  game: Game
};

export default class GamePanel extends Component<Props> {
  /**
   * The game panel contains:
   * - The logo
   * - The next Tetromino for the current player
   * - The name and score for each player
   * - Footer with credits
   */
  render() {
    const { curUser, game } = this.props;
    const player1 = getPlayer1(game, curUser);
    const { score, lines, nextTetromino } = player1;

    return (
      <div className="game-panel">
        <div className="title">
          <h1>
            World <strong>Tetris</strong>
          </h1>
        </div>
        <div className="label score-label">Score</div>
        <div className="count score-count">{score}</div>
        <div className="label lines-label">Lines</div>
        <div className="count lines-count">{lines}</div>
        <div className="label next-label">Next</div>
        <div className={this.getNextTetrominoClass()}>
          <Tetromino
            key={nextTetromino}
            color={COLORS[nextTetromino]}
            grid={SHAPES[nextTetromino]}
          />
        </div>
        <div className="label users-label">Players</div>
        <div className="users">
          {game.players.map(player => {
            const { user } = player;
            const classes = classNames('user', {
              // 'user-ready': user.status === 'READY',
            });

            return (
              <div className={classes} key={user.id}>
                <span>{user.name}</span>
              </div>
            );
          })}
        </div>

        <style jsx>{`
          .game-panel {
            position: absolute;
            top: 0;
            bottom: 0;
            left: 0;
            right: 0;
            color: #34495f;
          }

          .game-panel > div {
            position: absolute;
            left: calc(100% / 6);
            width: calc(100% / 6 * 4);
          }

          .label {
            color: #9ba4ab;
            font-size: 1em;
            line-height: 1.8em;
            font-weight: 300;
            white-space: nowrap;
          }

          .count {
            color: #3993d0;
            font-size: 2em;
            line-height: 0.8em;
            font-weight: 400;
            white-space: nowrap;
          }

          .title {
            top: calc(100% / 20 * 0.9);
          }

          .title h1 {
            margin: 0;
            padding: 0;
            color: #34495f;
            font-weight: 400;
            font-size: 1.6em;
            line-height: 1.1em;
            text-transform: uppercase;
            letter-spacing: 0.1em;
            text-align: center;
          }

          .score-label {
            top: calc(100% / 20 * 3.25);
          }

          .score-count {
            top: calc(100% / 20 * 4.25);
          }

          .lines-label {
            top: calc(100% / 20 * 5.5);
          }

          .lines-count {
            top: calc(100% / 20 * 6.5);
          }

          .next-label {
            top: calc(100% / 20 * 7.75);
          }

          .next-tetromino {
            top: calc(100% / 20 * 8.75);
            height: calc(100% / 20 * 4);
          }

          /* The I Tetromino needs to be lifted a bit because it has an empty row
            in its default position */
          .next-tetromino-I {
            transform: translate(0, -25%);
          }

          .users-label {
            top: calc(100% / 20 * 11);
          }

          .users {
            top: calc(100% / 20 * 12);
            height: calc(100% / 20 * 4);
            overflow-x: hidden;
            overflow-y: auto;
            background-color: #ecf0f1;
          }

          .user {
            box-sizing: border-box;
            height: calc(100% / 4);
            padding: 0 0.5em;
            font-size: 1em;
            line-height: 1.75em;
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
          }

          .user-ready {
            background: #3993d0;
            color: #fff;
          }
        `}</style>
      </div>
    );
  }

  getNextTetrominoClass() {
    const { curUser, game } = this.props;
    const player1 = getPlayer1(game, curUser);
    const { nextTetromino } = player1;

    // We use this extra class to position tetrominoes differently from CSS
    // based on their type
    return `next-tetromino next-tetromino-${nextTetromino}`;
  }
}
