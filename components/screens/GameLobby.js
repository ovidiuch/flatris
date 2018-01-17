// @flow

import React, { Component } from 'react';
import Button from '../Button';

import type { Game } from '../../types/state';

export type Props = {
  game: Game,
  onWatch: Function,
  onPlay: Function
};

/**
 * Screen for hanging around in the game's lobby
 */
export default class GameLobby extends Component<Props> {
  render() {
    const { onWatch, onPlay } = this.props;
    const seatsLeft = false;

    return (
      <div className="screen">
        <h2 className="title">Join game...</h2>
        {!seatsLeft && (
          <p className="message">Game already full. Wanna watch?</p>
        )}
        <div className="actions">
          <div className="button">
            <Button
              bgColor="#fff"
              color="#34495f"
              colorDisabled="rgba(52, 73, 95, 0.6)"
              onClick={onWatch}
            >
              Watch
            </Button>
          </div>
          <div className="button" onClick={onPlay}>
            <Button disabled={!seatsLeft}>Play</Button>
          </div>
        </div>
        <style jsx>{`
          .screen {
            position: absolute;
            top: 0;
            bottom: 0;
            left: calc(100% / 10);
            right: calc(100% / 10);
            color: #34495f;
            font-size: 1.1em;
          }

          .title {
            position: absolute;
            top: calc(100% / 20);
            margin: 0;
            padding: 0;
            font-size: 2.2em;
            line-height: 2.1em;
            font-weight: 600;
            white-space: nowrap;
            opacity: 0.7;
          }

          .message {
            position: absolute;
            top: calc(100% / 20 * 5);
            margin: 0;
            padding: 0;
            font-size: 1.2em;
            line-height: 1.3em;
          }

          .actions {
            position: absolute;
            top: calc(100% / 20 * 16);
            left: 0;
            right: 0;
            height: calc(100% / 20 * 2);
          }

          .button {
            position: relative;
            float: left;
            width: 50%;
            height: 100%;
          }
        `}</style>
      </div>
    );
  }
}
