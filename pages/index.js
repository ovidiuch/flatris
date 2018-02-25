// @flow

import React, { Component } from 'react';
import Link from 'next/link';
import withRedux from 'next-redux-wrapper';
import { createStore } from '../store';
import { addCurUserToState } from '../utils/api';
import Layout from '../components/Layout';

type Props = {};

class IndexPage extends Component<Props> {
  static async getInitialProps({ req, store }) {
    // Food for thought: How to not duplicate this on every page
    if (req) {
      await addCurUserToState(req, store);
    }
  }

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
