// @flow

import React, { Fragment, Component } from 'react';
import { getCurPlayer, getOtherPlayer } from 'shared/reducers/game';
import Button from '../../Button';
import Shake from '../../effects/Shake';
import Invite from '../Invite';
import Screen from '../shared/Screen';

import type { User, Player, Game } from 'shared/types/state';

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
      return <Invite disabled={disabled} gameId={game.id} onPlay={onRestart} />;
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
          Oh well... better luck
          <br />
          next time.
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
