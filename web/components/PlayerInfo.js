// @flow

import classNames from 'classnames';
import React, { Component } from 'react';

import type { Player } from 'shared/types/state';

// NOTE: This component is a mess. Potential refactor: Send entire game state
// and player index, and let it determine its various render paths internally.
type Props = {
  player: ?Player,
  wins: ?number,
  isPlayer1: boolean,
  showReadyState: boolean,
  onSelect?: Function
};

export default class PlayerInfo extends Component<Props> {
  renderMissingPlayer() {
    const { isPlayer1, onSelect } = this.props;
    const classes = classNames('player-info', {
      selectable: Boolean(onSelect)
    });

    return (
      <div className={classes} onClick={onSelect}>
        <div className="centered">
          <div className="player">{isPlayer1 ? '1p' : '2p'}</div>
          <div className="insert-coin">insert coin</div>
        </div>
        <style jsx>{`
          .player-info {
            position: absolute;
            width: 100%;
            height: 100%;
            background: #ecf0f1;
            color: #9ba4ab;
            font-family: 'Teko', sans-serif;
            font-weight: 300;
            letter-spacing: 0.02em;
            text-transform: uppercase;
            white-space: nowrap;
            text-align: center;
            user-select: none;
            cursor: default;
          }

          .selectable {
            background: #ecf0f1
              radial-gradient(rgba(255, 255, 255, 0.8) 0%, transparent 50%);
            background-size: 400% 400%;
            background-position: 100% 100%;
            animation: wave 5s 5s linear infinite;
            cursor: pointer;
          }

          .centered {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
          }

          .player {
            font-size: 3.2em;
            line-height: 0.9em;
            font-weight: 400;
          }

          .insert-coin {
            font-size: 1.6em;
            line-height: 1em;
          }

          @keyframes wave {
            0% {
              background-position: 100% 100%;
            }
            20% {
              background-position: 0% 0%;
            }
            100% {
              background-position: 0% 0%;
            }
          }
        `}</style>
      </div>
    );
  }

  render() {
    const { player, wins, showReadyState } = this.props;

    if (!player) {
      return this.renderMissingPlayer();
    }

    const { user, score, lines } = player;
    const showWins = typeof wins === 'number';
    const humanizedScore = humanizeNumber(score);

    return (
      <div className="player-info">
        <div className="name">
          <div className="vcentered ellipsis">{user.name}</div>
        </div>
        <div className="score">
          {showWins && (
            <div className="score-row">
              <div className="label vcentered">Wins</div>
              <div className="value vcentered">{wins}</div>
            </div>
          )}
          <div className="score-row">
            <div className="label vcentered">Score</div>
            <div className="value vcentered">{humanizedScore}</div>
          </div>
          {!showWins && (
            <div className="score-row">
              <div className="label vcentered">Lines</div>
              <div className="value vcentered">{lines}</div>
            </div>
          )}
        </div>
        {showReadyState && (
          <div className="status ready">
            <span>Ready</span>
          </div>
        )}
        <style jsx>{`
          .player-info {
            position: absolute;
            width: 100%;
            height: 100%;
            color: #34495f;
            font-family: 'Teko', sans-serif;
            font-size: 1.8em;
            line-height: 1em;
            font-weight: 300;
            text-transform: uppercase;
            letter-spacing: 0.02em;
          }

          .name {
            position: relative;
            height: calc(100% / 3);
            white-space: nowrap;
            font-weight: 400;
          }

          .ellipsis {
            overflow: hidden;
            text-overflow: ellipsis;
          }

          .score {
            position: absolute;
            top: calc(100% / 3);
            width: 100%;
            height: calc(100% / 3 * 2);
          }

          .score-row {
            position: relative;
            width: 100%;
            height: 50%;
          }

          .label {
            position: absolute;
            top: 0;
            left: 0;
            color: rgba(155, 164, 171, 0.8); /* #9ba4ab */
          }

          .value {
            position: absolute;
            top: 0;
            right: 0;
            color: #3993d0;
          }

          .ready {
            position: absolute;
            top: calc(100% / 3);
            bottom: 0;
            left: 0;
            right: 0;
            background: rgba(57, 147, 208, 0.85);
            color: #fff;
            font-size: 1.2em;
            font-weight: 600;
            text-transform: uppercase;
            text-align: center;
          }
          .ready span {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -35%);
            text-shadow: 1px 1px 0 rgba(0, 0, 0, 0.1);
          }

          .vcentered {
            position: absolute;
            max-width: 100%;
            top: 50%;
            transform: translate(0, -40%);
          }
        `}</style>
      </div>
    );
  }
}

function humanizeNumber(nr: number): string {
  if (nr < 10000) {
    return String(nr);
  }

  const { round } = Math;
  const thousands = nr / 1000;
  const rounded =
    thousands > 100 ? round(thousands) : round(thousands * 10) / 10;

  return `${rounded}K`;
}
