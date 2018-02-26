// @flow

import React, { Component } from 'react';
import withRedux from 'next-redux-wrapper';
import Error from 'next/error';
import { createStore } from '../store';
import { addGame, openGame } from '../actions/dashboard';
import { addCurUserToState, getGame } from '../utils/api';
import { SocketProvider } from '../components/socket/SocketProvider';
import Layout from '../components/Layout';
import FlatrisGame from '../components/FlatrisGame';

type Props = {
  statusCode: false | number
};

class JoinPage extends Component<Props> {
  static async getInitialProps({ req, res, query, store }) {
    // Food for thought: How to not duplicate this on every page
    if (req) {
      await addCurUserToState(req, store);
    }

    const gameId = query.g;
    const { games } = store.getState();

    // No need to request game again if it's already in store (client-side)
    // Action backfill mechanism will take care of updating the game's state
    if (!games[gameId]) {
      try {
        const game = await getGame(gameId);
        store.dispatch(addGame(game));
      } catch (err) {
        // TODO: Identify and signal 500s differently
        const statusCode = 404;

        // Both client and server render appropriate 404 page, but server will
        // also set 404 status code if this page is opened directly
        if (res) {
          res.statusCode = statusCode;
        }

        return { statusCode };
      }
    }

    store.dispatch(openGame(gameId));

    return {
      statusCode: false
    };
  }

  render() {
    const { statusCode } = this.props;
    if (statusCode) {
      return <Error statusCode={404} />;
    }

    return (
      <Layout>
        <SocketProvider>
          <FlatrisGame />
        </SocketProvider>
      </Layout>
    );
  }
}

export default withRedux(createStore)(JoinPage);
