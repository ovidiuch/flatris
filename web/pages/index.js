// @flow

import React, { Component } from 'react';
import { ReactReduxContext } from 'react-redux';
import withRedux from 'next-redux-wrapper';
import { createStore } from '../store';
import { loadDashboard, stripGameEffects } from '../actions/global';
import { addCurUserToState, getDashboard } from '../utils/api';
import { SocketProvider } from '../components/socket/SocketProvider';
import Layout from '../components/Layout';
import Dashboard from '../components/pages/Dashboard';

type Props = {};

class IndexPage extends Component<Props> {
  static async getInitialProps({ req, store }) {
    const { dispatch } = store;

    // Food for thought: How to not duplicate this on every page
    if (req) {
      await addCurUserToState(req, store);
    }

    const dashboardState = await getDashboard();
    dispatch(loadDashboard(dashboardState));

    // Client-side: Strip game effects before loading dashboard when going back
    // from game page
    if (!req) {
      dispatch(stripGameEffects());
    }
  }

  render() {
    return (
      <Layout>
        <ReactReduxContext.Consumer>
          {({ store }) => (
            <SocketProvider store={store}>
              <Dashboard />
            </SocketProvider>
          )}
        </ReactReduxContext.Consumer>
      </Layout>
    );
  }
}

export default withRedux(createStore)(IndexPage);
