// @flow

import React, { Fragment, Component } from 'react';
import Link from 'next/link';
import Button from '../Button';

import type { Game } from '../../types/state';

export type Props = {
  game: Game,
  onWatch: Function,
  onJoin: Function
};

// TODO: ReadyToJoin
export default class JoinGame extends Component<Props> {
  render() {
    const { game, onWatch, onJoin } = this.props;
    const roomLeft = game.players.length < 2;

    return (
      <div className="screen">
        <h2 className="title">Join game...</h2>
        <div className="message">
          {roomLeft ? (
            <Fragment>
              <p>
                <strong>Room for one more!</strong>
              </p>
              <p>
                You can watch, or you<br />can play. Up to you.
              </p>
            </Fragment>
          ) : (
            <Fragment>
              <p>
                <strong>Game full.</strong>
              </p>
              <p>
                You can watch, or<br />
                <Link href="/">
                  <a>create another game</a>
                </Link>.
              </p>
            </Fragment>
          )}
        </div>
        <div className="actions">
          <div className="button">
            <Button bgColor="#fff" color="#34495f" onClick={onWatch}>
              Watch
            </Button>
          </div>
          <div className="button" onClick={onJoin}>
            <Button disabled={!roomLeft}>Join</Button>
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
            white-space: nowrap;
          }

          .message p {
            margin-top: 0;
          }

          .message a {
            color: #34495f;
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
