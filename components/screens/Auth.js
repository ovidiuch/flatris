// @flow

import React, { Fragment, Component } from 'react';
import { connect } from 'react-redux';
import { auth } from '../../actions';
import { MAX_NAME_LENGTH } from '../../constants/user';
import { createUserSession } from '../../utils/api';
import Button from '../Button';
import Screen from './Screen';

type Props = {
  disabled?: boolean,
  onAuth?: Function,
  auth: typeof auth
};

type LocalState = {
  isOnboard: boolean,
  name: string
};

class Auth extends Component<Props, LocalState> {
  static defaultProps = {
    disabled: false
  };

  nameField: ?HTMLInputElement;

  state = {
    isOnboard: false,
    name: ''
  };

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
      const { onAuth, auth } = this.props;

      // Signal that auth started to parent
      if (onAuth) {
        onAuth();
      }

      const user = await createUserSession(name);
      auth(user);
    }
  };

  handleConfirmOnboarding = () => {
    this.setState({
      isOnboard: true
    });
  };

  render() {
    const { disabled } = this.props;
    const { isOnboard, name } = this.state;

    if (!isOnboard) {
      return (
        <Screen
          title="Welcome!"
          message={
            <Fragment>
              <p>
                Use the <strong>arrow keys</strong>,<br />or the{' '}
                <strong>buttons below</strong>
                <br />on mobile (portrait).
              </p>
              <p>
                <strong>Multiplayer twist:</strong>
                <br />Every line you clear<br />will be added to your<br />
                opponent & viceversa.
              </p>
              <p>
                <em>Play fast to survive!</em>
              </p>
            </Fragment>
          }
          actions={[
            <Button onClick={this.handleConfirmOnboarding}>Got it</Button>
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
                  disabled={disabled}
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
            <Button type="submit" disabled={disabled || !name}>
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

const mapDispatchToProps = {
  auth
};

export default connect(undefined, mapDispatchToProps)(Auth);
