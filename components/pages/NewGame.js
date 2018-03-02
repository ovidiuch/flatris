// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';
import Router from 'next/router';
import { createGame } from '../../utils/api';
import Auth from '../screens/Auth';
import GameFrame from './GameFrame';

import type { User, State } from '../../types/state';

type Props = {
  curUser: ?User
};

type LocalState = {
  requireAuth: boolean,
  pendingCreate: boolean
};

class NewGame extends Component<Props, LocalState> {
  constructor(props) {
    super(props);

    this.state = {
      requireAuth: !props.curUser,
      pendingCreate: false
    };
  }

  componentDidMount() {
    if (this.props.curUser) {
      this.createGame();
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.curUser && !prevProps.curUser) {
      this.createGame();
    }
  }

  createGame() {
    if (!this.state.pendingCreate) {
      // The user will be picked up from the session on the server
      this.setState({ pendingCreate: true }, createAndOpenGame);
    }
  }

  render() {
    const { requireAuth } = this.state;

    return <GameFrame>{requireAuth && <Auth />}</GameFrame>;
  }
}

async function createAndOpenGame() {
  const { id } = await createGame();
  Router.replace(`/join?g=${id}`, `/join/${id}`);
}

const mapStateToProps = ({ curUser }: State): $Shape<Props> => ({
  curUser
});

export default connect(mapStateToProps)(NewGame);
