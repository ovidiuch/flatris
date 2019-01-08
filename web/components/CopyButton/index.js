// @flow

import React, { Component } from 'react';
import Clipboard from 'clipboard';
import { COLORS } from 'shared/constants/tetromino';
import Button from '../Button';

type Props = {
  disabled: boolean,
  copyText: string,
  defaultLabel: string,
  successLabel: string,
  errorLabel: string
};

type LocalState = {
  copyStatus: null | 'success' | 'error'
};

export default class CopyButton extends Component<Props, LocalState> {
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
    const {
      disabled,
      copyText,
      defaultLabel,
      successLabel,
      errorLabel
    } = this.props;
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
      <div ref={this.handleCopyBtnRef} data-clipboard-text={copyText}>
        <Button bgColor={bgColor} color="#fff">
          {!copyStatus && defaultLabel}
          {copyStatus === 'success' && successLabel}
          {copyStatus === 'error' && errorLabel}
        </Button>
      </div>
    ) : (
      <div>
        <Button disabled bgColor={bgColor} color="#fff">
          {defaultLabel}
        </Button>
      </div>
    );
  }
}
