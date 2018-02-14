// @flow

import React, { Fragment, Component } from 'react';
import { getCurPlayer } from '../../reducers/game';
import Button from '../Button';
import Screen from './Screen';

import type { User, Game } from '../../types/state';

export type Props = {
  curUser: User,
  game: Game,
  onRestart: Function
};

export default class GameOver extends Component<Props> {
  render() {
    const { game } = this.props;
    const soloGame = game.players.length === 1;

    return (
      <Screen
        title="Game over"
        message={soloGame ? this.getSoloMessage() : this.getMultiMessage()}
        actions={this.getActions()}
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
    const player1 = getCurPlayer(game, curUser);

    if (player1.status === 'LOST') {
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

  getActions() {
    const { onRestart } = this.props;

    return [<Button onClick={onRestart}>Again</Button>];
  }
}
