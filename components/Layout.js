// @flow

import classNames from 'classnames';
import React, { Component } from 'react';
import Head from 'next/head';

import type { Node } from 'react';

type Props = {
  children: Node,
  title?: string
};

type State = {
  hasJsLoaded: boolean
};

export default class Layout extends Component<Props, State> {
  static defaultProps = {
    title: 'Flatris'
  };

  state = {
    hasJsLoaded: false
  };

  componentDidMount() {
    this.setState({
      hasJsLoaded: true
    });
  }

  render() {
    const { title, children } = this.props;
    const { hasJsLoaded } = this.state;
    const layoutClasses = classNames('layout', {
      'layout-static': !hasJsLoaded
    });

    // TODO: Embed fonts
    // http://www.sameratiani.com/2011/10/16/embed-inline-webfonts-in-css.html
    return (
      <div>
        <Head>
          <title>{title}</title>
          <meta charSet="utf-8" />
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width"
          />
        </Head>
        <style jsx global>{`
          html,
          body {
            margin: 0;
            padding: 0;
            font-family: -apple-system, BlinkMacSystemFont, Ubuntu,
              'Helvetica Neue', sans-serif;
            font-size: 16px;
          }
        `}</style>
        <div className={layoutClasses}>{children}</div>
        <style jsx>{`
          .layout {
            transition: filter 1s;
          }
          .layout-static {
            filter: grayscale(100%);
          }
        `}</style>
      </div>
    );
  }
}
