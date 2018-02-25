// @flow

import React, { Component } from 'react';
import withRedux from 'next-redux-wrapper';
import { createStore } from '../store';
import Layout from '../components/Layout';

type Props = {};

class IndexPage extends Component<Props> {
  render() {
    return <Layout>YO</Layout>;
  }
}

export default withRedux(createStore)(IndexPage);
