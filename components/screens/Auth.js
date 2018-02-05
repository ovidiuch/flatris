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

class Auth extends Component<Props> {
  static defaultProps = {
    disabled: false
  };

  nameField: ?HTMLInputElement;

  handleInputRef = node => {
    this.nameField = node;
    this.focusOnNameField();
  };

  focusOnNameField = () => {
    if (this.nameField && !this.props.disabled) {
      this.nameField.focus();
    }
  };

  handleGo = async e => {
    e.preventDefault();

    const { nameField } = this;
    if (nameField && nameField.value) {
      const { onAuth, auth } = this.props;

      // Signal that auth started to parent
      if (onAuth) {
        onAuth();
      }

      // TODO: Sanitize
      const user = await createUserSession(nameField.value);
      auth(user);
    }
  };

  render() {
    const { disabled } = this.props;

    return (
      <form onSubmit={this.handleGo}>
        <Screen
          title="Just a sec..."
          message={
            <Fragment>
              <p onClick={this.focusOnNameField}>Enter your name</p>
              <p>
                <input
                  type="text"
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
            <Button type="submit" disabled={disabled}>
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
            box-shadow: inset 0.25em 0.25em 0 0 rgba(0, 0, 0, 0.2);
            font-size: 1em;
            color: #666;
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
