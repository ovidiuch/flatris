// @flow

import { Component } from 'react';
import Router from 'next/router';
import { createGame } from '../actions';
import { withSocket } from '../utils/socket/connect';

import type { Node } from 'react';
import type { User, Game } from '../types/state';

type Props = {
  curUser: User,
  children: (curGame: Game) => Node,
  createGame: typeof createGame
};

class NewGame extends Component<Props> {
  componentDidMount() {
    this.createGame();
  }

  createGame = async () => {
    const { curUser, createGame } = this.props;

    const gameId = Date.now();
    await createGame(gameId, curUser);

    Router.push(`/join?g=${gameId}`);
  };

  render() {
    // Nothing to render here, component will redirect
    return null;
  }
}

const syncActions = {
  createGame
};

export default withSocket(NewGame, syncActions);
