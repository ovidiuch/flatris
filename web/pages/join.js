// @flow

import React, { Component } from 'react';
import Router from 'next/router';
import { ReactReduxContext } from 'react-redux';
import withRedux from 'next-redux-wrapper';
import { createStore } from '../store';
import { addGame, openGame, stripGameEffects } from '../actions/global';
import { addCurUserToState, getGame } from '../utils/api';
import { SocketProvider } from '../components/socket/SocketProvider';
import Title from '../components/Title';
import Layout from '../components/Layout';
import CurGameOfElse from '../components/CurGameOfElse';
import FlatrisGame from '../components/FlatrisGame';
import Error from '../components/pages/Error';

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
    } else {
      // Strip game effects to prevent triggering the last effect whenever
      // opening an existing game
      dispatch(stripGameEffects());
    }

    dispatch(openGame(gameId));

    return {
      statusCode: false
    };
  }

  render() {
    const { statusCode } = this.props;
    if (statusCode) {
      return (
        <Layout>
          <Error statusCode={statusCode} />
        </Layout>
      );
    }

    return (
      <Layout>
        <Title>Play Flatris</Title>
        <ReactReduxContext.Consumer>
          {({ store }) => (
            <SocketProvider store={store}>
              <CurGameOfElse else={() => Router.replace('/')}>
                <FlatrisGame />
              </CurGameOfElse>
            </SocketProvider>
          )}
        </ReactReduxContext.Consumer>
      </Layout>
    );
  }
}

export default withRedux(createStore)(JoinPage);
