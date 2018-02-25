// @flow

import React, { Component } from 'react';
import withRedux from 'next-redux-wrapper';
import Error from 'next/error';
import { createStore } from '../store';
import { loadGame } from '../actions';
import { addCurUserToState, getGame } from '../utils/api';
import { SocketProvider } from '../components/socket/SocketProvider';
import Layout from '../components/Layout';
import FlatrisGame from '../components/FlatrisGame';

type Props = {
  statusCode: false | number
};

class JoinPage extends Component<Props> {
  static async getInitialProps({ req, res, query, store }) {
    if (req) {
      await addCurUserToState(req, store);
    }

    try {
      const game = await getGame(query.g);
      store.dispatch(loadGame(game));

      return {
        statusCode: false
      };
    } catch (err) {
      // TODO: Identify and signal 500s differently
      const statusCode = 404;

      // Server side rendered pages will return this status code, whereas
      // client side rendered pages will just render the appropriate message
      if (res) {
        res.statusCode = statusCode;
      }

      return { statusCode };
    }
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
