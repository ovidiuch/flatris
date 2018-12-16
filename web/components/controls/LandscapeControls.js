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
import { isPlayer, allPlayersReady } from 'shared/reducers/game';
import { getCurGame } from '../../reducers/cur-game';

import Left from './Left';
import Right from './Right';
import Rotate from './Rotate';
import Drop from './Drop';

import type { User, Game, Backfills, State } from 'shared/types/state';

type Props = {
  curUser: ?User,
  game: Game,
  backfills: Backfills,
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
    const { curUser, game, backfills } = this.props;
    const isGameRunning = isPlayer(game, curUser) && allPlayersReady(game);
    const disabled = Boolean(!isGameRunning || backfills[game.id]);

    return (
      <Fragment>
        <div className="ctrl-side left">
          <div className="button">
            <Left disabled={disabled} onPress={this.handleLeftPress} />
          </div>
          <div className="button">
            <Rotate disabled={disabled} onPress={this.handleRotatePress} />
          </div>
        </div>
        <div className="ctrl-side right">
          <div className="button">
            <Right disabled={disabled} onPress={this.handleRightPress} />
          </div>
          <div className="button">
            <Drop disabled={disabled} onPress={this.handleDropPress} />
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

const mapStateToProps = (state: State): $Shape<Props> => {
  const { curUser, backfills } = state;

  return {
    curUser,
    game: getCurGame(state),
    backfills
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
  withSocket(LandscapeControls, syncActions)
);
