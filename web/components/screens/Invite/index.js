// @flow

import React, { Fragment, Component } from 'react';
import Button from '../../Button';
import CopyGameLinkButton from '../../CopyGameLinkButton';
import Screen from '../shared/Screen';

import type { GameId } from 'shared/types/state';

type Props = {
  disabled: boolean,
  gameId: GameId,
  onPlay: Function
};

export default class Invite extends Component<Props> {
  render() {
    const { disabled, gameId, onPlay } = this.props;

    return (
      <Screen
        title="1+1=3"
        message={
          <Fragment>
            <p>
              <strong>
                Playing with a <del>friend</del>
                <br />
                rival is more fun!
              </strong>
            </p>
            <div className="copy">
              <CopyGameLinkButton disabled={disabled} gameId={gameId} />
            </div>
            <p>
              Send the link and
              <br />
              warm up until the
              <br />
              other person arrives.
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
}
