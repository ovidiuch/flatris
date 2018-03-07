// @flow

import React, { Component } from 'react';
import Head from 'next/head';

type Props = {
  children: string
};

export default class Title extends Component<Props> {
  render() {
    return (
      <Head>
        <title>{this.props.children}</title>
      </Head>
    );
  }
}
