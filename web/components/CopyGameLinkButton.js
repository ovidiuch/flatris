// @flow

import React, { Component } from 'react';
import { getShareUrl } from '../utils/url';
import CopyButton from './CopyButton';

import type { GameId } from 'shared/types/state';

type Props = {
  disabled: boolean,
  gameId: GameId
};

export default class CopyGameLinkButton extends Component<Props> {
  render() {
    const { disabled, gameId } = this.props;

    return (
      <CopyButton
        disabled={disabled}
        copyText={getShareUrl(gameId)}
        defaultLabel="Copy link"
        successLabel="Link copied!"
        errorLabel="Copy failed :("
      />
    );
  }
}
