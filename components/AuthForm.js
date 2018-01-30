// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { auth } from '../actions';
import { createUserSession } from '../utils/api';

type Props = {
  auth: typeof auth
};

class AuthForm extends Component<Props> {
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
        <input type="text" ref={this.handleInputRef} />
        <button type="submit">Go</button>
      </form>
    );
  }
}

const mapDispatchToProps = {
  auth
};

export default connect(undefined, mapDispatchToProps)(AuthForm);
