import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import _ from 'lodash';
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
  disableAcceleration
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
    window.addEventListener('keydown', this.onKeyDown);
    window.addEventListener('keyup', this.onKeyUp);

    this.props.onLoad();
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.onKeyDown);
    window.removeEventListener('keyup', this.onKeyUp);
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

  renderInfoPanel() {
    const {
      gameState,
      styles
    } = this.props;

    return gameState === PLAYING
      ? null
      : <div className="info-panel-container" style={styles.infoPanel}>
          <InfoPanel />
        </div>;
  }

  renderControlIcon(path) {
    const { styles } = this.props;

    return (
      <svg style={styles.controlIcon} viewBox="0 0 24 24">
        <path d={path} />
      </svg>
    );
  }

  renderControls() {
    const {
      styles
    } = this.props;

    return (
      <div className="controls" style={styles.controls}>
        {React.createElement(
          Button,
          {
            ...attachPointerDownEvent(this.onRotatePress),
            style: styles.control
          },
          this.renderControlIcon(
            'M12 5V1L7 6l5 5V7c3.31 0 6 2.69 6 6s-2.69 6-6 6-6-2.69-6-6H4c0 4.42 3.58 8 8 8s8-3.58 8-8-3.58-8-8-8z'
          )
        )}
        {React.createElement(
          Button,
          {
            ...attachPointerDownEvent(this.onLeftPress),
            style: styles.control
          },
          this.renderControlIcon(
            'M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z'
          )
        )}
        {React.createElement(
          Button,
          {
            ...attachPointerDownEvent(this.onRightPress),
            style: styles.control
          },
          this.renderControlIcon(
            'M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z'
          )
        )}
        {React.createElement(
          Button,
          {
            ...attachPointerDownEvent(this.onPullPress),
            ...attachPointerUpEvent(this.onPullRelease),
            style: _.omit(styles.control, 'marginRight')
          },
          this.renderControlIcon(
            'M20 12l-1.41-1.41L13 16.17V4h-2v12.17l-5.58-5.59L4 12l8 8 8-8z'
          )
        )}
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
      styles
    } = this.props;

    return (
      <div className="flatris-game" style={styles.root}>
        {grid
          ? <div className="well-container" style={styles.well}>
              <Well
                grid={grid}
                activeTetromino={activeTetromino}
                activeTetrominoGrid={activeTetrominoGrid}
                activeTetrominoPosition={activeTetrominoPosition}
              />
            </div>
          : null}
        {this.renderInfoPanel()}
        <div className="game-panel-container" style={styles.gamePanel}>
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
      </div>
    );
  }
}

FlatrisGame.propTypes = {
  gameState: PropTypes.oneOf([STOPPED, PLAYING, PAUSED]).isRequired,
  score: PropTypes.number.isRequired,
  lines: PropTypes.number.isRequired,
  nextTetromino: PropTypes.string,
  grid: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.array)),
  activeTetromino: PropTypes.string,
  activeTetrominoGrid: PropTypes.arrayOf(
    PropTypes.arrayOf(PropTypes.number)
  ),
  activeTetrominoPosition: PropTypes.shape({
    x: PropTypes.number,
    y: PropTypes.number
  }),
  onLoad: PropTypes.func.isRequired,
  onStart: PropTypes.func.isRequired,
  onPause: PropTypes.func.isRequired,
  onResume: PropTypes.func.isRequired,
  onMoveLeft: PropTypes.func.isRequired,
  onMoveRight: PropTypes.func.isRequired,
  onRotate: PropTypes.func.isRequired,
  onEnableAcceleration: PropTypes.func.isRequired,
  onDisableAcceleration: PropTypes.func.isRequired
};

FlatrisGame.defaultProps = {
  nextTetromino: null,
  grid: null,
  activeTetromino: null,
  activeTetrominoGrid: null,
  activeTetrominoPosition: null
};

const { round } = Math;

const getControlIconStyle = ({ size }) => {
  const iconSize = round(size * 0.8);
  const padding = round((size - iconSize) / 2);

  return {
    marginTop: padding,
    width: iconSize,
    height: iconSize
  };
};

const getStyles = (
  {
    fontSize,
    root,
    well,
    side,
    controls
  }
) => ({
  root: {
    width: root.width,
    height: root.height,
    fontSize: fontSize.default
  },
  well,
  controls: {
    top: well.height,
    width: well.width,
    height: controls.size,
    marginTop: controls.padding
  },
  control: {
    width: controls.size,
    height: controls.size,
    fontSize: fontSize.control,
    lineHeight: `${controls.size}px`
  },
  controlIcon: getControlIconStyle(controls),
  infoPanel: well,
  gamePanel: {
    width: side.width,
    height: side.height,
    left: well.width
  }
});

const mapStateToProps = ({ game, layout }) => ({
  ...game,
  styles: getStyles(layout)
});

const mapDispatchToProps = dispatch => ({
  onLoad: () => dispatch(load()),
  onStart: () => dispatch(start()),
  onPause: () => dispatch(pause()),
  onResume: () => dispatch(resume()),
  onMoveLeft: () => dispatch(moveLeft()),
  onMoveRight: () => dispatch(moveRight()),
  onRotate: () => dispatch(rotate()),
  onEnableAcceleration: () => dispatch(enableAcceleration()),
  onDisableAcceleration: () => dispatch(disableAcceleration())
});

export default connect(mapStateToProps, mapDispatchToProps)(FlatrisGame);
