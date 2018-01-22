// @flow

import React from 'react';
import withRedux from 'next-redux-wrapper';
import { createStore } from '../store';
import { SocketProvider } from '../utils/socket/Provider';
import Layout from '../components/Layout';
import Auth from '../components/Auth';
import NewGame from '../components/NewGame';

const DefaultPage = () => (
  <Layout>
    <SocketProvider>
      <Auth>
        <NewGame />
      </Auth>
    </SocketProvider>
  </Layout>
);

export default withRedux(createStore)(DefaultPage);
