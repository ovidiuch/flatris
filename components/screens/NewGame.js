/* global window */
// @flow

import React, { Fragment, Component } from 'react';
import Clipboard from 'clipboard';
import { COLORS } from '../../constants/tetromino';
import Screen from './Screen';
import Button from '../Button';

import type { GameId } from '../../types/state';

type Props = {
  disabled: boolean,
  gameId: GameId,
  onPlay: Function
};

type LocalState = {
  copyStatus: null | 'success' | 'error'
};

export default class NewGame extends Component<Props, LocalState> {
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
    const { disabled, onPlay } = this.props;
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

    return (
      <Screen
        title="New game"
        message={
          <Fragment>
            <p>
              <strong>
                Invite a friend to<br />battle, or play solo.
              </strong>
            </p>
            {!disabled ? (
              <div
                className="copy"
                ref={this.handleCopyBtnRef}
                data-clipboard-text={this.getShareUrl()}
              >
                <Button bgColor={bgColor} color="#fff">
                  {!copyStatus && 'Copy link'}
                  {copyStatus === 'success' && 'Link copied!'}
                  {copyStatus === 'error' && 'Copy error :('}
                </Button>
              </div>
            ) : (
              <div className="copy">
                <Button disabled bgColor={bgColor} color="#fff">
                  Copy link
                </Button>
              </div>
            )}
            <p>
              Send the link and<br />warm up until the<br />other person
              arrives.
            </p>
            <style jsx>{`
              .copy {
                position: relative;
                height: calc(100% / 11 * 2);
                margin: 1em 0;
                font-size: 1.1em;
              }
            `}</style>
          </Fragment>
        }
        actions={[
          <Button disabled={disabled} onClick={onPlay}>
            Play
          </Button>
        ]}
      />
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
