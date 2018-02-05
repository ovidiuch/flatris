// @flow

import React, { Fragment, Component } from 'react';
import { connect } from 'react-redux';
import { auth } from '../../actions';
import { createUserSession } from '../../utils/api';
import Button from '../Button';
import Screen from './Screen';

type Props = {
  auth: typeof auth
};

class Auth extends Component<Props> {
  nameField: ?HTMLInputElement;

  handleInputRef = node => {
    this.nameField = node;

    if (node) {
      node.focus();
    }
  };

  handleGo = async e => {
    e.preventDefault();

    const { nameField } = this;
    if (nameField && nameField.value) {
      const user = await createUserSession(nameField.value);
      this.props.auth(user);
    }
  };

  render() {
    return (
      <form onSubmit={this.handleGo}>
        <Screen
          title="Just a sec..."
          message={
            <Fragment>
              <p>Enter your name</p>
              <p>
                <input
                  type="text"
                  ref={this.handleInputRef}
                  placeholder="Barry Lyndon"
                />
              </p>
              <p>
                <em>
                  Fake names<br />allowed ;-)
                </em>
              </p>
            </Fragment>
          }
          actions={[<Button type="submit">Enter</Button>]}
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
        `}</style>
      </form>
    );
  }
}

const mapDispatchToProps = {
  auth
};

export default connect(undefined, mapDispatchToProps)(Auth);
