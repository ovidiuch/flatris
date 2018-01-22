// @flow

import { Component } from 'react';
import { connect } from 'react-redux';
import Router from 'next/router';
import { createGame } from '../actions';
import { withSocket } from '../utils/socket/connect';
import { getCurUser } from '../reducers/cur-user';

import type { Node } from 'react';
import type { User, Game, State } from '../types/state';

type Props = {
  curUser: User,
  children: (curGame: Game) => Node,
  createGame: typeof createGame
};

class NewGame extends Component<Props> {
  componentDidMount() {
    this.createGame();
  }

  createGame = () => {
    const { curUser, createGame } = this.props;

    const gameId = Date.now();
    createGame(gameId, curUser);

    Router.push(`/join?g=${gameId}`);
  };

  render() {
    // Nothing to render here, component will redirect
    return null;
  }
}

const mapStateToProps = (state: State): $Shape<Props> => ({
  curUser: getCurUser(state)
});

const syncActions = {
  createGame
};

export default connect(mapStateToProps)(withSocket(NewGame, syncActions));
