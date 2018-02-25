// @flow

import React, { Fragment, Component } from 'react';
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

import type { User, Game, State } from '../../types/state';

type Props = {
  curUser: ?User,
  game: Game,
  moveLeft: typeof moveLeft,
  moveRight: typeof moveRight,
  rotate: typeof rotate,
  enableAcceleration: typeof enableAcceleration,
  disableAcceleration: typeof disableAcceleration
};

class LandscapeControls extends Component<Props> {
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

  render() {
    const { curUser, game } = this.props;
    const isGameRunning = isPlayer(game, curUser) && allPlayersReady(game);

    return (
      <Fragment>
        <div className="ctrl-side left">
          <div className="button">
            <Left disabled={!isGameRunning} onPress={this.handleLeftPress} />
          </div>
          <div className="button">
            <Rotate
              disabled={!isGameRunning}
              onPress={this.handleRotatePress}
            />
          </div>
        </div>
        <div className="ctrl-side right">
          <div className="button">
            <Right disabled={!isGameRunning} onPress={this.handleRightPress} />
          </div>
          <div className="button">
            <Drop disabled={!isGameRunning} onPress={this.handleDropPress} />
          </div>
        </div>
        <style jsx>{`
          .ctrl-side {
            position: absolute;
            top: 50%;
            transform: translate(0, -50%);
          }
          .left {
            left: 0;
          }
          .right {
            right: 0;
          }

          .left .button,
          .right .button {
            position: relative;
            float: left;
            width: 100%;
            height: 50%;
          }
        `}</style>
      </Fragment>
    );
  }
}

const mapStateToProps = (state: State): $Shape<Props> => ({
  curUser: state.curUser,
  game: getCurGame(state)
});

const syncActions = {
  moveLeft,
  moveRight,
  rotate,
  enableAcceleration,
  disableAcceleration
};

export default connect(mapStateToProps)(
  withSocket(LandscapeControls, syncActions)
);
