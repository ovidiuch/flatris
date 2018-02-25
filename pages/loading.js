// @flow

import React, { Component } from 'react';
import Router from 'next/router';
import withRedux from 'next-redux-wrapper';
import { createStore } from '../store';
import Loading from '../components/Loading';

type Props = {};

// NOTE: I built a Loading component a while ago for Flatris, but later
// realized it wasn't needed since everything was so fast. So I made a page
// to be able to look at it ¯\_(ツ)_/¯
class LoadingPage extends Component<Props> {
  handleClick = () => {
    Router.push('/');
  };

  render() {
    return (
      <div onClick={this.handleClick}>
        <Loading />
      </div>
    );
  }
}

export default withRedux(createStore)(LoadingPage);
