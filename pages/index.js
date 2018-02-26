// @flow

import React, { Component } from 'react';
import Link from 'next/link';
import withRedux from 'next-redux-wrapper';
import { createStore } from '../store';
import { loadDashboard } from '../actions/dashboard';
import { addCurUserToState, getDashboard } from '../utils/api';
import Layout from '../components/Layout';

import type { Games } from '../types/state';

type Props = {
  gameCount: number,
  games: Games
};

class IndexPage extends Component<Props> {
  static async getInitialProps({ req, store }): Promise<Props> {
    // Food for thought: How to not duplicate this on every page
    if (req) {
      await addCurUserToState(req, store);
    }

    const dashboardState = await getDashboard();
    store.dispatch(loadDashboard(dashboardState));

    return dashboardState;
  }

  render() {
    const { gameCount, games } = this.props;

    return (
      <Layout>
        <p>
          <Link href="/new">
            <a>Create game</a>
          </Link>
        </p>
        <p>
          Games: <strong>{gameCount}</strong>
        </p>
        <ul>
          {Object.keys(games).map(gameId => (
            <li key={gameId}>
              <Link prefetch href={`/join?g=${gameId}`} as={`/join/${gameId}`}>
                <a>{gameId}</a>
              </Link>
            </li>
          ))}
        </ul>
      </Layout>
    );
  }
}

export default withRedux(createStore)(IndexPage);
