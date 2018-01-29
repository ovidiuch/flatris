// @flow

import React, { Component } from 'react';
import fetch from 'isomorphic-unfetch';
import withRedux from 'next-redux-wrapper';
import Error from 'next/error';
import { createStore } from '../store';
import { getApiUrl } from '../utils/api';
import Layout from '../components/Layout';
import { SocketProvider } from '../utils/socket/Provider';
import Auth from '../components/Auth';
import JoinGame from '../components/JoinGame';
import GameContainer from '../components/GameContainer';
import FlatrisGame from '../components/FlatrisGame';

import type { Game } from '../types/state';

type Props = {
  game: ?Game
};

class JoinPage extends Component<Props> {
  static async getInitialProps({ query }) {
    try {
      const { g } = query;
      const game = await fetch(getApiUrl(`/game/${g}`)).then(res => res.json());

      return {
        game
      };
    } catch (err) {
      return { game: null };
    }
  }

  render() {
    const { game } = this.props;
    if (!game) {
      // TODO: Identify and signal 500s differently
      return <Error statusCode={404} />;
    }

    return (
      <Layout>
        <SocketProvider>
          <Auth>
            <JoinGame game={game}>
              <GameContainer>
                <FlatrisGame />
              </GameContainer>
            </JoinGame>
          </Auth>
        </SocketProvider>
      </Layout>
    );
  }
}

export default withRedux(createStore)(JoinPage);
