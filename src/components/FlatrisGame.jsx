import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import $ from 'jquery';
import { STOPPED, PLAYING, PAUSED } from '../constants/states';
import { UP, DOWN, LEFT, RIGHT } from '../constants/keys';
import { attachPointerDownEvent, attachPointerUpEvent } from '../lib/events';
import {
  load,
  start,
  pause,
  resume,
  moveLeft,
  moveRight,
  rotate,
  enableAcceleration,
  disableAcceleration,
} from '../actions';
import Well from './Well';
import GamePanel from './GamePanel';
import InfoPanel from './InfoPanel';
import Button from './Button';

import './FlatrisGame.css';

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
    $(window).on('keydown', this.onKeyDown);
    $(window).on('keyup', this.onKeyUp);

    this.props.onLoad();
  }

  componentWillUnmount() {
    $(window).off('keydown', this.onKeyDown);
    $(window).off('keyup', this.onKeyUp);
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
      onMoveRight,
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

  renderInfoPanel() {
    const {
      gameState,
    } = this.props;

    return gameState === PLAYING ? null : <InfoPanel />;
  }

  renderControls() {
    return (
      <div className="controls">
        {React.createElement(Button,
          attachPointerDownEvent(this.onRotatePress), '↻')}
        {React.createElement(Button,
          attachPointerDownEvent(this.onLeftPress), '←')}
        {React.createElement(Button,
          attachPointerDownEvent(this.onRightPress), '→')}
        {React.createElement(Button,
          _.assign(
            attachPointerDownEvent(this.onPullPress),
            attachPointerUpEvent(this.onPullRelease)), '↓')}
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
      onResume,
    } = this.props;

    return (
      <div className="flatris-game">
        {grid ? (
          <Well
            grid={grid}
            activeTetromino={activeTetromino}
            activeTetrominoGrid={activeTetrominoGrid}
            activeTetrominoPosition={activeTetrominoPosition}
          />
        ) : null}
        {this.renderInfoPanel()}
        <GamePanel
          gameState={gameState}
          score={score}
          lines={lines}
          nextTetromino={nextTetromino}
          onStart={onStart}
          onPause={onPause}
          onResume={onResume}
        />
        {this.renderControls()}
      </div>
    );
  }
}

FlatrisGame.propTypes = {
  gameState: React.PropTypes.oneOf([STOPPED, PLAYING, PAUSED]).isRequired,
  score: React.PropTypes.number.isRequired,
  lines: React.PropTypes.number.isRequired,
  nextTetromino: React.PropTypes.string,
  grid: React.PropTypes.arrayOf(
    React.PropTypes.arrayOf(React.PropTypes.array),
  ),
  activeTetromino: React.PropTypes.string,
  activeTetrominoGrid: React.PropTypes.arrayOf(
    React.PropTypes.arrayOf(React.PropTypes.number),
  ),
  activeTetrominoPosition: React.PropTypes.shape({
    x: React.PropTypes.number,
    y: React.PropTypes.number,
  }),
  onLoad: React.PropTypes.func.isRequired,
  onStart: React.PropTypes.func.isRequired,
  onPause: React.PropTypes.func.isRequired,
  onResume: React.PropTypes.func.isRequired,
  onMoveLeft: React.PropTypes.func.isRequired,
  onMoveRight: React.PropTypes.func.isRequired,
  onRotate: React.PropTypes.func.isRequired,
  onEnableAcceleration: React.PropTypes.func.isRequired,
  onDisableAcceleration: React.PropTypes.func.isRequired,
};

FlatrisGame.defaultProps = {
  nextTetromino: null,
  grid: null,
  activeTetromino: null,
  activeTetrominoGrid: null,
  activeTetrominoPosition: null,
};

const mapStateToProps = state => state;
const mapDispatchToProps = dispatch => ({
  onLoad: () => dispatch(load()),
  onStart: () => dispatch(start()),
  onPause: () => dispatch(pause()),
  onResume: () => dispatch(resume()),
  onMoveLeft: () => dispatch(moveLeft()),
  onMoveRight: () => dispatch(moveRight()),
  onRotate: () => dispatch(rotate()),
  onEnableAcceleration: () => dispatch(enableAcceleration()),
  onDisableAcceleration: () => dispatch(disableAcceleration()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(FlatrisGame);
