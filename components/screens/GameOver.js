// @flow

import React, { Fragment, Component } from 'react';
import { getCurPlayer, getOtherPlayer } from '../../reducers/game';
import Shake from '../effects/Shake';
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
    const { curUser, game, onRestart } = this.props;
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
          actions={[<Button onClick={onRestart}>Again</Button>]}
        />
      );
    }

    return (
      <Screen
        title={this.getMultiTitle()}
        message={this.getMultiMessage()}
        actions={[
          <Shake time={otherPlayer.ping}>
            <Button onClick={onRestart}>Again</Button>
          </Shake>
        ]}
      />
    );
  }

  getMultiTitle() {
    const { curUser, game } = this.props;
    const curPlayer = getCurPlayer(game, curUser);

    return curPlayer.status === 'LOST' ? 'You lost!' : 'You won!';
  }

  getMultiMessage() {
    const { curUser, game } = this.props;
    const curPlayer = getCurPlayer(game, curUser);

    if (curPlayer.status === 'LOST') {
      return (
        <Fragment>
          <p>
            Oh well... better luck<br />next time.
          </p>
          <p>
            <strong>Up for another?</strong>
          </p>
        </Fragment>
      );
    }

    return (
      <Fragment>
        <p>You kicked ass.</p>
        <p>
          <strong>Up for another?</strong>
        </p>
      </Fragment>
    );
  }
}
