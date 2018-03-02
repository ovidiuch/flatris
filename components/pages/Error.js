// @flow

import React, { Fragment, Component } from 'react';
import Link from 'next/link';
import Button from '../Button';
import CopyButton from '../CopyButton';
import Screen from '../screens/Screen';
import GameFrame from './GameFrame';

type Props = {
  statusCode: ?number,
  errorText?: string
};

export default class Error extends Component<Props> {
  render() {
    const { statusCode } = this.props;

    return (
      <GameFrame>
        {statusCode === 404 ? this.render404() : this.renderMisc()}
      </GameFrame>
    );
  }

  render404() {
    return (
      <Screen
        title="Not Found"
        message={
          <Fragment>
            <p>Hmm...</p>
            <p>
              It's either gone or<br />
              it never was ¯\_(ツ)_/¯
            </p>
          </Fragment>
        }
        actions={[
          <Link href="/">
            <Button>Home</Button>
          </Link>
        ]}
      />
    );
  }

  renderMisc() {
    const { errorText } = this.props;

    return (
      <Screen
        title="Oh Noes!"
        message={
          <Fragment>
            <p>
              <strong>Something broke :/</strong>
            </p>
            <p>
              At least this page<br />
              works, right?
            </p>
            {errorText && (
              <Fragment>
                <div className="copy">
                  <CopyButton
                    disabled={false}
                    copyText={errorText}
                    defaultLabel="Copy error"
                    successLabel="Error copied!"
                    errorLabel="Copy failed :("
                  />
                </div>
                <p>
                  <span className="highlight">
                    Copy and paste the
                    <br />error{' '}
                    <a
                      href="https://github.com/skidding/flatris/issues/new"
                      target="_blank"
                    >
                      here
                    </a>, please!
                  </span>
                </p>
              </Fragment>
            )}
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
          <Link href="/">
            <Button>Home</Button>
          </Link>
        ]}
      />
    );
  }
}
