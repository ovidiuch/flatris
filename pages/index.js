// @flow

import React, { Component } from 'react';
import withRedux from 'next-redux-wrapper';
import { createStore } from '../store';
import { SocketProvider } from '../utils/SocketProvider';
import { addCurUserToState } from '../utils/api';
import Layout from '../components/Layout';
import GameContainer from '../components/GameContainer';
import NewGame from '../components/NewGame';

type Props = {};

class CreatePage extends Component<Props> {
  static async getInitialProps({ req, store }) {
    if (req) {
      await addCurUserToState(req, store);
    }
  }

  render() {
    return (
      <Layout>
        <SocketProvider>
          <GameContainer>
            <NewGame />
          </GameContainer>
        </SocketProvider>
      </Layout>
    );
  }
}

export default withRedux(createStore)(CreatePage);
