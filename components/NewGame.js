// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';
import Router from 'next/router';
import { createGame } from '../utils/api';
import AuthForm from './AuthForm';

import type { Node } from 'react';
import type { User, Game, State } from '../types/state';

type Props = {
  curUser: ?User,
  children: (curGame: Game) => Node
};

class NewGame extends Component<Props> {
  isCreating = false;

  componentDidMount() {
    this.createGameIfUser();
  }

  componentDidUpdate() {
    this.createGameIfUser();
  }

  createGameIfUser() {
    if (this.props.curUser && !this.isCreating) {
      createAndOpenGame(this.props.curUser);
      this.isCreating = true;
    }
  }

  render() {
    // The component will redirect after user auth
    return !this.props.curUser && <AuthForm />;
  }
}

async function createAndOpenGame(user: User) {
  const { id } = await createGame(user);
  Router.push(`/join?g=${id}`);
}

const mapStateToProps = ({ curUser }: State): $Shape<Props> => ({
  curUser
});

export default connect(mapStateToProps)(NewGame);
