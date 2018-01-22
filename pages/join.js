// @flow

import React from 'react';
import withRedux from 'next-redux-wrapper';
import { createStore } from '../store';
import Layout from '../components/Layout';
import { SocketProvider } from '../utils/socket/Provider';
import Auth from '../components/Auth';
import JoinGame from '../components/JoinGame';
import GameContainer from '../components/GameContainer';
import FlatrisGame from '../components/FlatrisGame';

const DefaultPage = ({ url }) => (
  <Layout>
    <SocketProvider>
      <Auth>
        {curUser => (
          <JoinGame curUser={curUser} gameId={Number(url.query.g)}>
            {curGame => (
              <GameContainer>
                <FlatrisGame curUser={curUser} game={curGame} />
              </GameContainer>
            )}
          </JoinGame>
        )}
      </Auth>
    </SocketProvider>
  </Layout>
);

export default withRedux(createStore)(DefaultPage);
