// @flow

import React, { Component } from 'react';
import withRedux from 'next-redux-wrapper';
import Error from 'next/error';
import { createStore } from '../store';
import { loadGame } from '../actions';
import { addCurUserToState, getGame } from '../utils/api';
import { SocketProvider } from '../utils/socket/Provider';
import Layout from '../components/Layout';
import GameContainer from '../components/GameContainer';
import FlatrisGame from '../components/FlatrisGame';

type Props = {
  gameExists: boolean
};

class JoinPage extends Component<Props> {
  static async getInitialProps({ req, query, store }) {
    if (req) {
      await addCurUserToState(req, store);
    }

    try {
      const game = await getGame(query.g);
      store.dispatch(loadGame(game));

      return {
        gameExists: true
      };
    } catch (err) {
      return { gameExists: false };
    }
  }

  render() {
    const { gameExists } = this.props;
    if (!gameExists) {
      // TODO: Identify and signal 500s differently
      return <Error statusCode={404} />;
    }

    return (
      <Layout>
        <SocketProvider>
          <GameContainer>
            <FlatrisGame />
          </GameContainer>
        </SocketProvider>
      </Layout>
    );
  }
}

export default withRedux(createStore)(JoinPage);
