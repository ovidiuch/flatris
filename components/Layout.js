// @flow

import classNames from 'classnames';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Head from 'next/head';

import type { Node } from 'react';
import type { State } from '../types/state';
import type { Action, Dispatch } from '../types/actions';

type Props = {
  jsReady: boolean,
  children: Node,
  title?: string,
  jsLoad: () => Action
};

class Layout extends Component<Props> {
  static defaultProps = {
    title: 'Flatris'
  };

  componentDidMount() {
    this.props.jsLoad();
  }

  render() {
    const { jsReady, title, children } = this.props;
    const layoutClasses = classNames('layout', {
      'layout-static': !jsReady
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
            content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1, user-scalable=no"
          />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta name="theme-color" content="#34495f" />
          <link rel="manifest" href="/static/manifest.webmanifest" />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/static/favicon-16x16.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/static/favicon-32x32.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="192x192"
            href="/static/android-chrome-192x192.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="256x256"
            href="/static/android-chrome-256x256.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/static/apple-touch-icon.png"
          />
          <link
            href="https://fonts.googleapis.com/css?family=Teko:300,400"
            rel="stylesheet"
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

function mapStateToProps({ jsReady }: State): $Shape<Props> {
  return { jsReady };
}

function mapDispatchToProps(dispatch: Dispatch): $Shape<Props> {
  return {
    jsLoad: () => dispatch({ type: 'JS_LOAD' })
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Layout);
