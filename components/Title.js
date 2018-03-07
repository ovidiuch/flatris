// @flow

import React, { Component } from 'react';
import Head from 'next/head';

type Props = {
  title: string
};

export default class Title extends Component<Props> {
  render() {
    const { title } = this.props;

    return (
      <Head>
        <title>{title}</title>
      </Head>
    );
  }
}
