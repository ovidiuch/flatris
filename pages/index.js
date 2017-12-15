import React from 'react';
import withRedux from 'next-redux-wrapper';
import { createStore } from '../store';
import Layout from '../components/Layout';
import FlatrisGame from '../components/FlatrisGame';

const DefaultPage = () => (
  <Layout>
    <FlatrisGame />
  </Layout>
);

export default withRedux(createStore)(DefaultPage);
