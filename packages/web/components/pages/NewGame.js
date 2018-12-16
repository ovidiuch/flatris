// @flow

import React, { Fragment, Component } from 'react';
import { connect } from 'react-redux';
import Router from 'next/router';
import { createGame, Unauthorized } from '../../utils/api';
import { unauth } from '../../actions/global';
import Title from '../Title';
import Auth from '../screens/Auth';
import GameFrame from './GameFrame';

import type { User, State } from 'shared/types/state';
import type { UnauthAction } from 'shared/types/actions';

type Props = {
  curUser: ?User,
  unauth: () => UnauthAction
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
    } else if (!this.props.curUser && prevProps.curUser) {
      // This happens when user session existed but was invalidated to due
      // server deploy (which flushes all user sessions)
      this.setState({
        requireAuth: true,
        pendingCreate: false
      });
    }
  }

  createGame() {
    const { unauth } = this.props;
    const { pendingCreate } = this.state;

    if (!pendingCreate) {
      // The user will be picked up from the session on the server
      this.setState({ pendingCreate: true }, async () => {
        try {
          await createAndOpenGame();
        } catch (err) {
          if (err instanceof Unauthorized) {
            unauth();
          } else {
            throw err;
          }
        }
      });
    }
  }

  render() {
    const { requireAuth } = this.state;

    return (
      <Fragment>
        <Title>New game | Flatris</Title>
        <GameFrame>{requireAuth && <Auth />}</GameFrame>
      </Fragment>
    );
  }
}

async function createAndOpenGame() {
  const { id } = await createGame();
  Router.replace(`/join?g=${id}`, `/join/${id}`);
}

const mapStateToProps = ({ curUser }: State): $Shape<Props> => ({
  curUser
});

const mapDispatchToProps = {
  unauth
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewGame);
