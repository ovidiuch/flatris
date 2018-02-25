// @flow

import React, { Component } from 'react';
import Link from 'next/link';
import withRedux from 'next-redux-wrapper';
import { createStore } from '../store';
import Layout from '../components/Layout';

type Props = {};

class IndexPage extends Component<Props> {
  render() {
    return (
      <Layout>
        <Link href="/new">
          <a>Create game</a>
        </Link>
      </Layout>
    );
  }
}

export default withRedux(createStore)(IndexPage);
