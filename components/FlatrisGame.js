import React from 'react';
import { number, string, array, func, shape, oneOf, arrayOf } from 'prop-types';
import { connect } from 'react-redux';
import _ from 'lodash';
import { STOPPED, PLAYING, PAUSED } from '../constants/states';
import { UP, DOWN, LEFT, RIGHT } from '../constants/keys';
import { attachPointerDownEvent, attachPointerUpEvent } from '../utils/events';
import {
  load,
  start,
  pause,
  resume,
  moveLeft,
  moveRight,
  rotate,
  enableAcceleration,
  disableAcceleration
} from '../actions';
import Well from './Well';
import GamePanel from './GamePanel';
import InfoPanel from './InfoPanel';
import Button from './Button';

class FlatrisGame extends React.Component {
  /**
   * The Tetris game was originally designed and programmed by Alexey Pajitnov.
   * It was released on June 6, 1984 and has since become a world-wide
   * phenomenon. Read more about the game at http://en.wikipedia.org/wiki/Tetris
   */
  constructor(props) {
    super(props);

    this.onKeyDown = this.onKeyDown.bind(this);
    this.onKeyUp = this.onKeyUp.bind(this);
    this.onRotatePress = this.onRotatePress.bind(this);
    this.onLeftPress = this.onLeftPress.bind(this);
    this.onRightPress = this.onRightPress.bind(this);
    this.onPullPress = this.onPullPress.bind(this);
    this.onPullRelease = this.onPullRelease.bind(this);
  }

  componentDidMount() {
    if (global.window) {
      global.window.addEventListener('keydown', this.onKeyDown);
      global.window.addEventListener('keyup', this.onKeyUp);
    }

    this.props.onLoad();
  }

  componentWillUnmount() {
    if (global.window) {
      global.window.removeEventListener('keydown', this.onKeyDown);
      global.window.removeEventListener('keyup', this.onKeyUp);
    }
  }

  onKeyDown(e) {
    // Prevent page from scrolling when pressing arrow keys
    if (_.values([UP, DOWN, LEFT, RIGHT]).indexOf(e.keyCode) !== -1) {
      e.preventDefault();
    }

    if (!this.isGameRunning()) {
      return;
    }

    const {
      onEnableAcceleration,
      onRotate,
      onMoveLeft,
      onMoveRight
    } = this.props;

    switch (e.keyCode) {
      case DOWN:
        onEnableAcceleration();
        break;
      case UP:
        onRotate();
        break;
      case LEFT:
        onMoveLeft();
        break;
      case RIGHT:
        onMoveRight();
        break;
      default:
    }
  }

  onKeyUp(e) {
    if (!this.isGameRunning()) {
      return;
    }

    if (e.keyCode === DOWN) {
      this.props.onDisableAcceleration();
    }
  }

  onRotatePress(e) {
    if (!this.isGameRunning()) {
      return;
    }

    e.preventDefault();
    this.props.onRotate();
  }

  onLeftPress(e) {
    if (!this.isGameRunning()) {
      return;
    }

    e.preventDefault();
    this.props.onMoveLeft();
  }

  onRightPress(e) {
    if (!this.isGameRunning()) {
      return;
    }

    e.preventDefault();
    this.props.onMoveRight();
  }

  onPullPress(e) {
    if (!this.isGameRunning()) {
      return;
    }

    e.preventDefault();
    this.props.onEnableAcceleration();
  }

  onPullRelease(e) {
    if (!this.isGameRunning()) {
      return;
    }

    e.preventDefault();
    this.props.onDisableAcceleration();
  }

  isGameRunning() {
    return this.props.gameState === PLAYING;
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
          <Button {...attachPointerDownEvent(this.onRotatePress)}>
            {this.renderControlIcon(
              'M12 5V1L7 6l5 5V7c3.31 0 6 2.69 6 6s-2.69 6-6 6-6-2.69-6-6H4c0 4.42 3.58 8 8 8s8-3.58 8-8-3.58-8-8-8z'
            )}
          </Button>
        </div>
        <div className="button">
          <Button {...attachPointerDownEvent(this.onLeftPress)}>
            {this.renderControlIcon(
              'M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z'
            )}
          </Button>
        </div>
        <div className="button">
          <Button {...attachPointerDownEvent(this.onRightPress)}>
            {this.renderControlIcon(
              'M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z'
            )}
          </Button>
        </div>
        <div className="button">
          <Button
            {...attachPointerDownEvent(this.onPullPress)}
            {...attachPointerUpEvent(this.onPullRelease)}
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
    const {
      gameState,
      score,
      lines,
      nextTetromino,
      grid,
      activeTetromino,
      activeTetrominoGrid,
      activeTetrominoPosition,
      onStart,
      onPause,
      onResume
    } = this.props;

    return (
      <div className="flatris-game">
        {grid && (
          <div className="well-container">
            <Well
              grid={grid}
              activeTetromino={activeTetromino}
              activeTetrominoGrid={activeTetrominoGrid}
              activeTetrominoPosition={activeTetrominoPosition}
            />
          </div>
        )}
        {gameState !== PLAYING && (
          <div className="info-panel-container">
            <InfoPanel />
          </div>
        )}
        <div className="game-panel-container">
          <GamePanel
            gameState={gameState}
            score={score}
            lines={lines}
            nextTetromino={nextTetromino}
            onStart={onStart}
            onPause={onPause}
            onResume={onResume}
          />
        </div>
        {this.renderControls()}
        <style jsx>{`
          /* Flatris expects a 480 width viewport */
          .flatris-game {
            position: position;
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
            right: calc(100% * 6 / 16);
            background: #ecf0f1;
          }

          .info-panel-container {
            background: rgba(236, 240, 241, 0.85);
          }

          .game-panel-container {
            position: absolute;
            top: 0;
            right: 0;
            left: calc(100% * 10 / 16);
            background: #fff;
          }

          .well-container,
          .info-panel-container,
          .game-panel-container {
            bottom: calc(100% * 4 / 24);
          }
        `}</style>
      </div>
    );
  }
}

FlatrisGame.propTypes = {
  gameState: oneOf([STOPPED, PLAYING, PAUSED]).isRequired,
  score: number.isRequired,
  lines: number.isRequired,
  nextTetromino: string,
  grid: arrayOf(arrayOf(array)),
  activeTetromino: string,
  activeTetrominoGrid: arrayOf(arrayOf(number)),
  activeTetrominoPosition: shape({
    x: number,
    y: number
  }),
  onLoad: func.isRequired,
  onStart: func.isRequired,
  onPause: func.isRequired,
  onResume: func.isRequired,
  onMoveLeft: func.isRequired,
  onMoveRight: func.isRequired,
  onRotate: func.isRequired,
  onEnableAcceleration: func.isRequired,
  onDisableAcceleration: func.isRequired
};

FlatrisGame.defaultProps = {
  nextTetromino: null,
  grid: null,
  activeTetromino: null,
  activeTetrominoGrid: null,
  activeTetrominoPosition: null
};

const mapStateToProps = ({ game }) => ({
  ...game
});

const mapDispatchToProps = {
  onLoad: load,
  onStart: start,
  onPause: pause,
  onResume: resume,
  onMoveLeft: moveLeft,
  onMoveRight: moveRight,
  onRotate: rotate,
  onEnableAcceleration: enableAcceleration,
  onDisableAcceleration: disableAcceleration
};

export default connect(mapStateToProps, mapDispatchToProps)(FlatrisGame);
