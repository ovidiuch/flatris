// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { auth } from '../actions';

import type { Node } from 'react';
import type { User, State } from '../types/state';

type Props = {
  curUser: ?User,
  children: Node,
  auth: typeof auth
};

class Auth extends Component<Props> {
  nameField: ?HTMLInputElement;

  componentDidMount() {
    const curUser = localStorage.getItem('user');
    if (curUser) {
      const { id, name } = JSON.parse(curUser);
      this.props.auth(id, name);
    }
  }

  handleInputRef = node => {
    this.nameField = node;

    if (node) {
      node.focus();
    }
  };

  handleGo = e => {
    e.preventDefault();

    const { nameField } = this;
    if (nameField) {
      const id = Date.now();
      const name = nameField.value;
      this.props.auth(id, name);

      localStorage.setItem('user', JSON.stringify({ id, name }));
    }
  };

  render() {
    const { curUser, children } = this.props;

    return curUser ? (
      children
    ) : (
      <form onSubmit={this.handleGo}>
        <input type="text" ref={this.handleInputRef} />
        <button type="submit">Go</button>
      </form>
    );
  }
}

const mapStateToProps = ({ curUser }: State): $Shape<Props> => ({
  curUser
});

const mapDispatchToProps = {
  auth
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
