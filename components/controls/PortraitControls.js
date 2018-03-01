// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  moveLeft,
  moveRight,
  rotate,
  enableAcceleration,
  disableAcceleration
} from '../../actions/game';
import { withSocket } from '../socket/SocketConnect';
import { isPlayer, allPlayersReady } from '../../reducers/game';
import { getCurGame } from '../../reducers/cur-game';

import Left from './Left';
import Right from './Right';
import Rotate from './Rotate';
import Drop from './Drop';

import type { User, Game, Backfill, State } from '../../types/state';

type Props = {
  curUser: ?User,
  game: Game,
  backfill: ?Backfill,
  moveLeft: typeof moveLeft,
  moveRight: typeof moveRight,
  rotate: typeof rotate,
  enableAcceleration: typeof enableAcceleration,
  disableAcceleration: typeof disableAcceleration
};

class PortraitControls extends Component<Props> {
  handleLeftPress = e => {
    e.preventDefault();

    const { moveLeft } = this.props;
    moveLeft();
  };

  handleRightPress = e => {
    e.preventDefault();

    const { moveRight } = this.props;
    moveRight();
  };

  handleRotatePress = e => {
    e.preventDefault();

    const { rotate } = this.props;
    rotate();
  };

  handleDropPress = e => {
    e.preventDefault();

    const { enableAcceleration } = this.props;
    enableAcceleration();
  };

  handleDropRelease = e => {
    e.preventDefault();

    const { disableAcceleration } = this.props;
    disableAcceleration();
  };

  render() {
    const { curUser, game, backfill } = this.props;
    const isGameRunning = isPlayer(game, curUser) && allPlayersReady(game);
    const disabled = Boolean(!isGameRunning || backfill);

    return (
      <div className="controls">
        <div className="button">
          <Rotate disabled={disabled} onPress={this.handleRotatePress} />
        </div>
        <div className="button">
          <Left disabled={disabled} onPress={this.handleLeftPress} />
        </div>
        <div className="button">
          <Right disabled={disabled} onPress={this.handleRightPress} />
        </div>
        <div className="button">
          <Drop
            disabled={disabled}
            onPress={this.handleDropPress}
            onRelease={this.handleDropRelease}
          />
        </div>
        <style jsx>{`
          .controls {
            position: absolute;
            /* Hanging outside the bottom of the parent container */
            top: 100%;
            height: calc(100% / 20 * 4);
            left: 0;
            right: 0;
          }

          .controls .button {
            position: relative;
            float: left;
            width: 25%;
            height: 100%;
          }
        `}</style>
      </div>
    );
  }
}

const mapStateToProps = (state: State): $Shape<Props> => {
  const { curUser, backfill } = state;

  return {
    curUser,
    game: getCurGame(state),
    backfill
  };
};

const syncActions = {
  moveLeft,
  moveRight,
  rotate,
  enableAcceleration,
  disableAcceleration
};

export default connect(mapStateToProps)(
  withSocket(PortraitControls, syncActions)
);
