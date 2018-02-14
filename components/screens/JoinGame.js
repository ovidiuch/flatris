// @flow

import React, { Fragment, Component } from 'react';
import Screen from './Screen';
import Link from 'next/link';
import Button from '../Button';

import type { Game } from '../../types/state';

export type Props = {
  game: Game,
  onWatch: Function,
  onJoin: Function
};

export default class JoinGame extends Component<Props> {
  render() {
    const { game, onWatch, onJoin } = this.props;
    const roomLeft = game.players.length < 2;

    return (
      <Screen
        title="Join game..."
        message={
          roomLeft ? (
            <Fragment>
              <p>
                <strong>Room for one more!</strong>
              </p>
              <p>
                You can watch, or<br />you can play.
              </p>
              <p>What will it be?</p>
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
          )
        }
        actions={[
          <Button disabled={!roomLeft} onClick={onJoin}>
            Join
          </Button>,
          <Button bgColor="#fff" color="#34495f" onClick={onWatch}>
            Watch
          </Button>
        ]}
      />
    );
  }
}
