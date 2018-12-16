// @flow

import React, { Component } from 'react';
import Router from 'next/router';
import withRedux from 'next-redux-wrapper';
import { createStore } from '../store';
import { addCurUserToState } from '../utils/api';
import Loading from '../components/Loading';

type Props = {};

// NOTE: I built a Loading component a while ago for Flatris, but later
// realized it wasn't needed since everything was so fast. So I made a page
// to be able to look at it ¯\_(ツ)_/¯
class LoadingPage extends Component<Props> {
  static async getInitialProps({ req, store }) {
    // Food for thought: How to not duplicate this on every page
    if (req) {
      await addCurUserToState(req, store);
    }
  }

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
