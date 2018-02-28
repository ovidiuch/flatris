// @flow

import React, { Component } from 'react';
import Router from 'next/router';
import Error from 'next/error';
import withRedux from 'next-redux-wrapper';
import { createStore } from '../store';
import { addGame, openGame } from '../actions/global';
import { addCurUserToState, getGame } from '../utils/api';
import { SocketProvider } from '../components/socket/SocketProvider';
import Layout from '../components/Layout';
import CurGameOfElse from '../components/CurGameOfElse';
import FlatrisGame from '../components/FlatrisGame';

type Props = {
  statusCode: false | number
};

class JoinPage extends Component<Props> {
  static async getInitialProps({ req, res, query, store }): Promise<Props> {
    // Food for thought: How to not duplicate this on every page
    if (req) {
      await addCurUserToState(req, store);
    }

    const { getState, dispatch } = store;
    const gameId = query.g;
    const { games } = getState();

    // No need to request game again if it's already in store (client-side)
    // Action backfill mechanism will take care of updating the game's state
    if (!games[gameId]) {
      try {
        const game = await getGame(gameId);
        dispatch(addGame(game));
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

    dispatch(openGame(gameId));

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
          <CurGameOfElse else={() => Router.replace('/')}>
            <FlatrisGame />
          </CurGameOfElse>
        </SocketProvider>
      </Layout>
    );
  }
}

export default withRedux(createStore)(JoinPage);
