// @flow

import { Component } from 'react';
import { connect } from 'react-redux';

import type { Node } from 'react';
import type { GameId, Games, State } from 'shared/types/state';

type Props = {
  children: Node,
  games: Games,
  curGame: ?GameId,
  else: () => mixed
};

type LocalState = {
  elseTriggered: boolean
};

// The purpose of this component is to ensure the child component is only
// rendered when state.curGame is valid, and to allow the parent component to
// respond accordingly otherwise, when state.curGame isn't valid.
// One practical example is when a user leaves a game page open for a long time
// and the game gets removed from the server due to inactivity. Upon user's
// return, the cur game will point to a missing game. Because we capture this,
// however, we can safely redirect to / when this happens.
class CurGameOfElse extends Component<Props, LocalState> {
  state = {
    elseTriggered: false
  };

  componentDidMount() {
    this.curGameOrElse();
  }

  componentDidUpdate() {
    this.curGameOrElse();
  }

  render() {
    return hasCurGame(this.props) ? this.props.children : null;
  }

  curGameOrElse() {
    if (!this.state.elseTriggered && !hasCurGame(this.props)) {
      this.setState({ elseTriggered: true }, this.props.else);
    }
  }
}

function hasCurGame({ games, curGame }: Props) {
  return Boolean(curGame && games[curGame]);
}

const mapStateToProps = ({ games, curGame }: State): $Shape<Props> => ({
  games,
  curGame
});

export default connect(mapStateToProps)(CurGameOfElse);
