// @flow

import React, { Fragment, Component } from 'react';
import { connect } from 'react-redux';
import Router from 'next/router';
import { createGame } from '../utils/api';
import GamePanel from './GamePanel';
import Auth from './screens/Auth';

import type { Node } from 'react';
import type { User, Game, State } from '../types/state';

type Props = {
  curUser: ?User,
  children: (curGame: Game) => Node
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

    return (
      <Fragment>
        <div className="screen-container">{requireAuth && <Auth />}</div>
        <div className="side-container">
          <GamePanel curUser={null} game={null} />
        </div>
        <style jsx>{`
          .screen-container {
            position: absolute;
            top: 0;
            bottom: 0;
            left: 0;
            right: calc(100% / 16 * 6);
            background: rgba(236, 240, 241, 0.85);
          }
          .side-container {
            position: absolute;
            top: 0;
            bottom: 0;
            right: 0;
            left: calc(100% / 16 * 10);
            background: #fff;
          }
        `}</style>
      </Fragment>
    );
  }
}

async function createAndOpenGame() {
  const { id } = await createGame();
  Router.push(`/join?g=${id}`, `/join/${id}`);
}

const mapStateToProps = ({ curUser }: State): $Shape<Props> => ({
  curUser
});

export default connect(mapStateToProps)(NewGame);
