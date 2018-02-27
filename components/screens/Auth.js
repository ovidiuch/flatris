// @flow

import React, { Fragment, Component } from 'react';
import { connect } from 'react-redux';
import { auth } from '../../actions/global';
import { MAX_NAME_LENGTH } from '../../constants/user';
import { createUserSession } from '../../utils/api';
import { isMobileDevice } from '../../utils/events';
import Button from '../Button';
import Screen from './Screen';

import type { User, State } from '../../types/state';

type Props = {
  jsReady: boolean,
  auth: typeof auth
};

type LocalState = {
  isMobile: boolean,
  name: string,
  pendingAuth: boolean,
  hasSubmitted: boolean,
  user: ?User
};

class Auth extends Component<Props, LocalState> {
  static defaultProps = {
    disabled: false
  };

  nameField: ?HTMLInputElement;

  state = {
    isMobile: false,
    name: '',
    pendingAuth: false,
    user: null,
    hasSubmitted: false
  };

  componentDidMount() {
    // TODO: Create DetectDevice component with two render props:
    // - hasMounted: boolean (false on the server)
    // - isMobile: boolean (only reliable once hasMounted is true)
    if (isMobileDevice()) {
      this.setState({
        isMobile: true
      });
    }
  }

  handleInputRef = node => {
    this.nameField = node;
    this.focusOnNameField();
  };

  focusOnNameField = () => {
    if (this.nameField && !this.props.disabled) {
      this.nameField.focus();
    }
  };

  handleNameChange = e => {
    this.setState({
      name: e.target.value
    });
  };

  handleGo = async e => {
    e.preventDefault();

    const { name } = this.state;
    if (name) {
      this.setState({
        pendingAuth: true
      });

      const user = await createUserSession(name);

      // Add the user to state and delay adding it to the app state until the
      // user seems the onboarding screen
      this.setState({
        pendingAuth: false,
        user
      });
    }
  };

  handleConfirmOnboarding = () => {
    const { auth } = this.props;
    const { user } = this.state;

    if (!user) {
      throw new Error('Onboarding with missing user');
    }

    this.setState({
      hasSubmitted: true
    });

    auth(user);
  };

  render() {
    const { jsReady } = this.props;
    const { name, pendingAuth, user, hasSubmitted, isMobile } = this.state;

    const ctrlInstruction = isMobile ? (
      <Fragment>
        Press the <strong>left</strong>, <strong>right</strong>,<br />
        <strong>rotate</strong> & <strong>drop</strong> buttons to<br />
        control the falling piece.
      </Fragment>
    ) : (
      <Fragment>
        Use the <strong>arrow keys</strong>
        <br />and the <strong>space bar</strong> to<br />control the falling
        piece.
      </Fragment>
    );

    // Greet user with onboarding after they authenticate
    if (user) {
      return (
        <Screen
          title="Welcome!"
          message={
            <Fragment>
              <p>{ctrlInstruction}</p>
              <p>
                <strong>Multiplayer twist</strong>:
                <br />
                <span className="highlight">
                  Every line you clear<br />will be added to your<br />
                  opponent
                </span>{' '}
                and viceversa.
              </p>
              <p>Play fast to survive!</p>
              <style jsx>{`
                .highlight {
                  background: rgba(245, 228, 129, 1);
                  padding: 0.15em 0;
                }
              `}</style>
            </Fragment>
          }
          actions={[
            <Button
              disabled={hasSubmitted}
              onClick={this.handleConfirmOnboarding}
            >
              Got it
            </Button>
          ]}
        />
      );
    }

    return (
      <form onSubmit={this.handleGo}>
        <Screen
          title="One sec..."
          message={
            <Fragment>
              <p onClick={this.focusOnNameField}>Enter your name</p>
              <p>
                <input
                  type="text"
                  value={name}
                  onChange={this.handleNameChange}
                  disabled={!jsReady || pendingAuth}
                  ref={this.handleInputRef}
                  placeholder="Monkey"
                  maxLength={MAX_NAME_LENGTH}
                />
              </p>
              <p>
                <small>Fake names allowed ;-)</small>
              </p>
            </Fragment>
          }
          actions={[
            <Button type="submit" disabled={!jsReady || !name || pendingAuth}>
              Enter
            </Button>
          ]}
        />
        <style jsx>{`
          input {
            box-sizing: border-box;
            width: 100%;
            padding: 0.8em;
            border: 0;
            background: #fff;
            color: #666;
            box-shadow: inset 0.25em 0.25em 0 0 rgba(0, 0, 0, 0.2);
            font-size: 1em;
            text-transform: uppercase;
            outline: none;
          }
          input:focus {
            box-shadow: inset 0.25em 0.25em 0 0 #3993d0;
            color: #333;
          }
          input::placeholder {
            color: #ccc;
            font-weight: 300;
          }
          input:disabled {
            cursor: not-allowed;
          }
        `}</style>
      </form>
    );
  }
}

function mapStateToProps({ jsReady }: State): $Shape<Props> {
  return { jsReady };
}

const mapDispatchToProps = {
  auth
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
