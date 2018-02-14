// @flow

import React, { Fragment, Component } from 'react';
import { getCurPlayer, getOtherPlayer } from '../../reducers/game';
import Shake from '../effects/Shake';
import Button from '../Button';
import Screen from './Screen';

import type { User, Player, Game } from '../../types/state';

export type Props = {
  curUser: User,
  game: Game,
  onRestart: Function
};

export default class GameOver extends Component<Props> {
  render() {
    const { curUser, game } = this.props;
    const curPlayer = getCurPlayer(game, curUser);
    const otherPlayer = getOtherPlayer(game, curPlayer);

    return (
      <Screen
        title="Game over"
        message={otherPlayer ? this.getMultiMessage() : this.getSoloMessage()}
        actions={this.getActions(otherPlayer)}
      />
    );
  }

  getSoloMessage() {
    return (
      <Fragment>
        <p>Well, that was fun!</p>
        <p>
          <strong>Up for another?</strong>
        </p>
      </Fragment>
    );
  }

  getMultiMessage() {
    const { curUser, game } = this.props;
    const curPlayer = getCurPlayer(game, curUser);

    if (curPlayer.status === 'LOST') {
      return (
        <Fragment>
          <p>
            Oh well... better luck<br />next time!
          </p>
          <p>
            <strong>Up for another?</strong>
          </p>
        </Fragment>
      );
    }

    return (
      <Fragment>
        <p>Noice! You kicked ass.</p>
        <p>
          <strong>Up for another?</strong>
        </p>
      </Fragment>
    );
  }

  getActions(otherPlayer: ?Player) {
    const { onRestart } = this.props;

    return [
      <Shake time={otherPlayer && otherPlayer.ping}>
        <Button onClick={onRestart}>Again</Button>
      </Shake>
    ];
  }
}
