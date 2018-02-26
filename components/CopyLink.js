/* global window */
// @flow

import React, { Component } from 'react';
import Clipboard from 'clipboard';
import { COLORS } from '../constants/tetromino';
import Button from './Button';

import type { GameId } from '../types/state';

type Props = {
  disabled: boolean,
  gameId: GameId
};

type LocalState = {
  copyStatus: null | 'success' | 'error'
};

export default class CopyLink extends Component<Props, LocalState> {
  clipboard: ?typeof Clipboard;

  state = {
    copyStatus: null
  };

  componentWillUnmount() {
    if (this.clipboard) {
      this.clipboard.destroy();
    }
  }

  handleCopyBtnRef = (node: ?HTMLElement) => {
    if (node) {
      const clipboard = new Clipboard(node);
      clipboard.on('success', this.handleCopySuccess);
      clipboard.on('error', this.handleCopyError);

      this.clipboard = clipboard;
    }
  };

  handleCopySuccess = () => {
    this.setState({
      copyStatus: 'success'
    });
  };

  handleCopyError = () => {
    this.setState({
      copyStatus: 'error'
    });
  };

  render() {
    const { disabled } = this.props;
    const { copyStatus } = this.state;

    let bgColor;
    switch (copyStatus) {
      case 'success':
        bgColor = COLORS.S;
        break;
      case 'error':
        bgColor = COLORS.Z;
        break;
      default:
        bgColor = COLORS.J;
    }

    return !disabled ? (
      <div ref={this.handleCopyBtnRef} data-clipboard-text={this.getShareUrl()}>
        <Button bgColor={bgColor} color="#fff">
          {!copyStatus && 'Copy link'}
          {copyStatus === 'success' && 'Link copied!'}
          {copyStatus === 'error' && 'Copy error :('}
        </Button>
      </div>
    ) : (
      <div>
        <Button disabled bgColor={bgColor} color="#fff">
          Copy link
        </Button>
      </div>
    );
  }

  getShareUrl() {
    // NOTE: This code only works in to browser (ie. not on the server). SSR
    // will return a disabled copy button.
    const { gameId } = this.props;
    const { protocol, host } = window.location;

    return `${protocol}//${host}/join/${gameId}`;
  }
}
