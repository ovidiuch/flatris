/* global window */
// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { UP, DOWN, LEFT, RIGHT } from '../constants/keys';
import { attachPointerDownEvent, attachPointerUpEvent } from '../utils/events';
import { getPlayer } from '../reducers/game';
import {
  createGame,
  startGame,
  leaveGame,
  moveLeft,
  moveRight,
  rotate,
  enableAcceleration,
  disableAcceleration
} from '../actions';
import Well from './Well';
import GamePanel from './GamePanel';
import Button from './Button';

import type { User, Game } from '../types/state';

type Props = {
  curUser: User,
  game: Game,
  createGame: typeof createGame,
  startGame: typeof startGame,
  leaveGame: typeof leaveGame,
  moveLeft: typeof moveLeft,
  moveRight: typeof moveRight,
  rotate: typeof rotate,
  enableAcceleration: typeof enableAcceleration,
  disableAcceleration: typeof disableAcceleration
};

type State = {
  showMenu: boolean
};

class FlatrisGame extends Component<Props, State> {
  state = {
    showMenu: false
  };

  /**
   * The Tetris game was originally designed and programmed by Alexey Pajitnov.
   * It was released on June 6, 1984 and has since become a world-wide
   * phenomenon. Read more about the game at http://en.wikipedia.org/wiki/Tetris
   */
  componentDidMount() {
    // window isn't available on the server side, but nor is componentDidMount
    // called on the server
    window.addEventListener('keydown', this.handleKeyDown);
    window.addEventListener('keyup', this.handleKeyUp);
  }

  componentWillUnmount() {
    // window isn't available on the server side, but nor is componentDidMount
    // called on the server
    window.removeEventListener('keydown', this.handleKeyDown);
    window.removeEventListener('keyup', this.handleKeyUp);

    this.props.leaveGame();
  }

  handleKeyDown = e => {
    // Prevent page from scrolling when pressing arrow keys
    if (_.values([UP, DOWN, LEFT, RIGHT]).indexOf(e.keyCode) !== -1) {
      e.preventDefault();
    }

    if (!this.isPlaying()) {
      return;
    }

    const {
      curUser,
      enableAcceleration,
      rotate,
      moveLeft,
      moveRight
    } = this.props;

    switch (e.keyCode) {
      case DOWN:
        enableAcceleration(curUser.id);
        break;
      case UP:
        rotate(curUser.id);
        break;
      case LEFT:
        moveLeft(curUser.id);
        break;
      case RIGHT:
        moveRight(curUser.id);
        break;
      default:
    }
  };

  handleKeyUp = e => {
    if (!this.isPlaying()) {
      return;
    }

    if (e.keyCode === DOWN) {
      const { curUser, disableAcceleration } = this.props;
      disableAcceleration(curUser.id);
    }
  };

  handleRotatePress = e => {
    if (!this.isPlaying()) {
      return;
    }

    e.preventDefault();

    const { curUser, rotate } = this.props;
    rotate(curUser.id);
  };

  handleLeftPress = e => {
    if (!this.isPlaying()) {
      return;
    }

    e.preventDefault();

    const { curUser, moveLeft } = this.props;
    moveLeft(curUser.id);
  };

  handleRightPress = e => {
    if (!this.isPlaying()) {
      return;
    }

    e.preventDefault();

    const { curUser, moveRight } = this.props;
    moveRight(curUser.id);
  };

  handlePullPress = e => {
    if (!this.isPlaying()) {
      return;
    }

    e.preventDefault();

    const { curUser, enableAcceleration } = this.props;
    enableAcceleration(curUser.id);
  };

  handlePullRelease = e => {
    if (!this.isPlaying()) {
      return;
    }

    e.preventDefault();

    const { curUser, disableAcceleration } = this.props;
    disableAcceleration(curUser.id);
  };

  handleMenu = () => {
    const { curUser, startGame } = this.props;
    startGame(curUser.id);
  };

  isPlaying() {
    const { game } = this.props;

    // TODO: Maybe current player is dead but watching adversary
    return game.status === 'PLAYING';
  }

  renderControlIcon(path) {
    return (
      <svg viewBox="0 0 24 24">
        <path d={path} />
      </svg>
    );
  }

  renderControls() {
    return (
      <div className="controls">
        <div className="button">
          <Button {...attachPointerDownEvent(this.handleRotatePress)}>
            {this.renderControlIcon(
              'M12 5V1L7 6l5 5V7c3.31 0 6 2.69 6 6s-2.69 6-6 6-6-2.69-6-6H4c0 4.42 3.58 8 8 8s8-3.58 8-8-3.58-8-8-8z'
            )}
          </Button>
        </div>
        <div className="button">
          <Button {...attachPointerDownEvent(this.handleLeftPress)}>
            {this.renderControlIcon(
              'M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z'
            )}
          </Button>
        </div>
        <div className="button">
          <Button {...attachPointerDownEvent(this.handleRightPress)}>
            {this.renderControlIcon(
              'M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z'
            )}
          </Button>
        </div>
        <div className="button">
          <Button
            {...attachPointerDownEvent(this.handlePullPress)}
            {...attachPointerUpEvent(this.handlePullRelease)}
          >
            {this.renderControlIcon(
              'M20 12l-1.41-1.41L13 16.17V4h-2v12.17l-5.58-5.59L4 12l8 8 8-8z'
            )}
          </Button>
        </div>
        <style jsx>{`
          .controls {
            position: absolute;
            top: calc(100% * 20 / 24);
            bottom: 0;
            left: 0;
            right: 0;
          }

          .controls .button {
            position: relative;
            float: left;
            width: 25%;
            height: 100%;
          }

          .controls .button :global(button) {
            overflow: hidden;
            width: 80%;
            height: 80%;
            margin: 10% 0 0 10%;
            background: #ecf0f1;
            color: #34495f;
            border-radius: 100%;
          }

          .controls .button :global(svg) {
            fill: #34495f;
            transform: scale(0.6);
          }

          .controls .button:nth-child(1) :global(svg) {
            transform-origin: 50% 50%;
            transform: scale(-0.6, 0.6);
          }
        `}</style>
      </div>
    );
  }

  render() {
    const { curUser, game } = this.props;
    const curPlayer = getPlayer(game, curUser.id);
    const {
      grid,
      activeTetromino,
      activeTetrominoGrid,
      activeTetrominoPosition
    } = curPlayer;
    const { showMenu } = this.state;

    return (
      <div className="flatris-game">
        <div className="well-container">
          <Well
            grid={grid}
            activeTetromino={activeTetromino}
            activeTetrominoGrid={activeTetrominoGrid}
            activeTetrominoPosition={activeTetrominoPosition}
          />
        </div>
        <div className="game-panel-container">
          <GamePanel
            curUser={curUser}
            game={game}
            userId={curUser.id}
            showMenuButton={!showMenu}
            onMenu={this.handleMenu}
          />
        </div>
        {this.renderControls()}
        <style jsx>{`
          /* Flatris expects a 480 width viewport */
          .flatris-game {
            position: absolute;
            top: 0;
            bottom: 0;
            left: 0
            right: 0;
          }

          .well-container,
          .info-panel-container {
            position: absolute;
            top: 0;
            left: 0;
            right: calc(100% / 16 * 6);
            background: #ecf0f1;
          }

          .info-panel-container {
            background: rgba(236, 240, 241, 0.85);
          }

          .game-panel-container {
            position: absolute;
            top: 0;
            right: 0;
            left: calc(100% / 16 * 10);
            background: #fff;
          }

          .well-container,
          .info-panel-container,
          .game-panel-container {
            height: calc(100% / 24 * 20);
          }
        `}</style>
      </div>
    );
  }
}

const mapStateToProps = ({ game, curUser }) => ({
  game,
  curUser
});

const mapDispatchToProps = {
  createGame,
  startGame,
  leaveGame,
  moveLeft,
  moveRight,
  rotate,
  enableAcceleration,
  disableAcceleration
};

export default connect(mapStateToProps, mapDispatchToProps)(FlatrisGame);
