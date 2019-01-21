// @flow

import React, { Fragment, Component } from 'react';
import Link from 'next/link';
import Title from '../../Title';
import Button from '../../Button';
import CopyButton from '../../CopyButton';
import Screen from '../../screens/shared/Screen';
import GameFrame from '../GameFrame';

import type { ComponentError } from 'shared/types/error';

type Props = {
  statusCode?: number,
  error?: ComponentError
};

export default class Error extends Component<Props> {
  render() {
    const { statusCode } = this.props;

    return (
      <GameFrame>
        <Title>Error :/</Title>
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
              It's either gone or
              <br />
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
    const { error } = this.props;

    return (
      <Screen
        title="Oh Noes!"
        message={
          <Fragment>
            <p>
              <strong>Something broke :/</strong>
            </p>
            {error && (
              <Fragment>
                <div className="copy">
                  <CopyButton
                    disabled={false}
                    copyText={`${error.message}\n\n${error.stack}`}
                    defaultLabel="Copy error"
                    successLabel="Error copied!"
                    errorLabel="Copy failed :("
                  />
                </div>
                <p>
                  <span className="highlight">
                    Please{' '}
                    <a href={getGithubIssueUrl(error)} target="_blank">
                      click here
                    </a>{' '}
                    to
                    <br />
                    share what happened.
                  </span>
                </p>
                <p>
                  At least this page
                  <br />
                  works, right?
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

function getGithubIssueUrl(error: ComponentError) {
  const title = 'Check out this error';
  const body = getGithubIssueBody(error);

  return `https://github.com/skidding/flatris/issues/new?title=${encodeURIComponent(
    title
  )}&body=${encodeURIComponent(body)}`;
}

function getGithubIssueBody({ message, stack }: ComponentError) {
  return `## Error

${message}

## Component stack trace

${stack}`;
}
