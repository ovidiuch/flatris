// @flow

import React, { Fragment, Component } from 'react';
import { getCurPlayer, getOtherPlayer } from '../../reducers/game';
import Shake from '../effects/Shake';
import Button from '../Button';
import Screen from './Screen';

import type { User, Player, Game } from '../../types/state';

type Props = {
  disabled: boolean,
  curUser: User,
  game: Game,
  onRestart: Function
};

export default class GameOver extends Component<Props> {
  render() {
    const { disabled, curUser, game, onRestart } = this.props;
    const curPlayer = getCurPlayer(game, curUser);
    const otherPlayer = getOtherPlayer(game, curPlayer);

    if (!otherPlayer) {
      return (
        <Screen
          title="Game over"
          message={
            <Fragment>
              <p>That was fun!</p>
              <p>
                <strong>Up for another?</strong>
              </p>
            </Fragment>
          }
          actions={[
            <Button disabled={disabled} onClick={onRestart}>
              Again
            </Button>
          ]}
        />
      );
    }

    return (
      <Screen
        title={getMultiTitle(curPlayer)}
        message={getMultiMessage(curPlayer, otherPlayer)}
        actions={[
          <Shake time={otherPlayer.ping}>
            <Button disabled={disabled} onClick={onRestart}>
              Again
            </Button>
          </Shake>
        ]}
      />
    );
  }
}

function getMultiTitle(curPlayer: Player) {
  return curPlayer.status === 'LOST' ? 'You lost!' : 'You won!';
}

function getMultiMessage(curPlayer: Player, otherPlayer: Player) {
  const maxLosses = Math.max(curPlayer.losses, otherPlayer.losses);
  const numWins = maxLosses + 1;
  const numGames = numWins * 2 - 1;
  const bestOutOfMsg = `Best ${numWins} out of ${numGames}?`;

  if (curPlayer.status === 'LOST') {
    return (
      <Fragment>
        <p>
          Oh well... better luck<br />next time.
        </p>
        <p>
          <strong>{bestOutOfMsg}</strong>
        </p>
      </Fragment>
    );
  }

  return (
    <Fragment>
      <p>You kicked ass.</p>
      <p>
        <strong>{bestOutOfMsg}</strong>
      </p>
    </Fragment>
  );
}
