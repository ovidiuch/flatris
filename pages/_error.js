// @flow

import React, { Component } from 'react';
import withRedux from 'next-redux-wrapper';
import { createStore } from '../store';
import Layout from '../components/Layout';
import Error from '../components/pages/Error';

type Props = {
  statusCode: ?number
};

type InitialProps = {
  res?: http$ServerResponse,
  err?: {
    statusCode: number
  }
};

export class ErrorPage extends Component<Props> {
  static async getInitialProps({ res, err }: InitialProps) {
    const statusCode = res ? res.statusCode : err ? err.statusCode : null;

    return { statusCode };
  }

  render() {
    const { statusCode } = this.props;

    return (
      <Layout>
        {statusCode ? <Error statusCode={statusCode} /> : <Error />}
      </Layout>
    );
  }
}

export default withRedux(createStore)(ErrorPage);
