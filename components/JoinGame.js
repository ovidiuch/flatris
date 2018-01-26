// @flow
/* global fetch */

import { Component } from 'react';
import { connect } from 'react-redux';
import { createGame, joinGame } from '../actions';
import { withSocket } from '../utils/socket/connect';
import { getCurUser } from '../reducers/cur-user';
import { getApiUrl } from '../utils/api';

import type { Node } from 'react';
import type { User, Game, GameId, State } from '../types/state';

type Props = {
  gameId: GameId,
  curUser: User,
  curGame: ?Game,
  children: Node,
  createGame: typeof createGame,
  joinGame: typeof joinGame
};

class JoinGame extends Component<Props> {
  componentDidMount() {
    this.fetchGameState();
  }

  fetchGameState = async () => {
    const { curUser, gameId, createGame, joinGame } = this.props;

    const games = await fetch(getApiUrl('/games')).then(res => res.json());
    const { players: [{ user }] } = games[gameId];

    // TODO: Load entire game
    // TODO: Don't join if game is already running
    createGame(gameId, user);
    joinGame(gameId, curUser);
  };

  render() {
    const { curUser, curGame, children } = this.props;

    // It takes two independent actions to load and join game, and we're only
    // ready to  render the game once both actions propagated
    return curGame && curGame.players.find(p => p.user.id === curUser.id)
      ? children
      : null;
  }
}

const mapStateToProps = (state: State): $Shape<Props> => ({
  curUser: getCurUser(state),
  curGame: state.curGame
});

const mapDispatchToProps = {
  createGame
};

const syncActions = {
  joinGame
};

export default connect(mapStateToProps, mapDispatchToProps)(
  withSocket(JoinGame, syncActions)
);
