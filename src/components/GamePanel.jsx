import React from 'react';
import { STOPPED, PLAYING, PAUSED } from '../constants/states';
import { SHAPES, COLORS } from '../constants/tetromino';
import { attachPointerDownEvent } from '../lib/events';
import connectLayout from '../lib/layout-connect';
import Tetromino from './Tetromino';
import Button from './Button';

import './GamePanel.css';

class GamePanel extends React.Component {
  /**
   * The game panel contains:
   * - The next Tetromino to be inserted
   * - The score and lines cleared
   * - Start or pause/resume controls
   */
  getNextTetrominoClass() {
    const classes = ['next-tetromino'];

    // We use this extra class to position tetrominoes differently from CSS
    // based on their type
    if (this.props.nextTetromino) {
      classes.push(`next-tetromino-${this.props.nextTetromino}`);
    }

    return classes.join(' ');
  }

  renderGameButton() {
    const {
      gameState,
      onStart,
      onPause,
      onResume,
      styles,
    } = this.props;

    let eventHandler;
    let label;

    switch (gameState) {
      case PLAYING:
        eventHandler = onPause;
        label = 'Pause';
        break;
      case PAUSED:
        eventHandler = onResume;
        label = 'Resume';
        break;
      default:
        eventHandler = onStart;
        label = 'New game';
    }

    return React.createElement(Button, {
      ...attachPointerDownEvent(eventHandler),
      style: styles.button
    }, label);
  }

  render() {
    const {
      score,
      lines,
      nextTetromino,
      styles,
    } = this.props;

    return (
      <div className="game-panel" style={styles.root}>
        <p className="title" style={styles.title}>Flatris</p>
        <p className="label" style={styles.label}>Score</p>
        <p className="count" style={styles.count}>{score}</p>
        <p className="label" style={styles.label}>Lines Cleared</p>
        <p className="count" style={styles.count}>{lines}</p>
        <p className="label" style={styles.label}>Next Shape</p>
        <div className={this.getNextTetrominoClass()} style={styles.nextTetrimino}>
          {nextTetromino ? (
            <Tetromino
              key={nextTetromino}
              color={COLORS[nextTetromino]}
              grid={SHAPES[nextTetromino]}
            />
          ) : null}
        </div>
        {this.renderGameButton()}
      </div>
    );
  }
}

GamePanel.propTypes = {
  gameState: React.PropTypes.oneOf([STOPPED, PLAYING, PAUSED]).isRequired,
  score: React.PropTypes.number.isRequired,
  lines: React.PropTypes.number.isRequired,
  nextTetromino: React.PropTypes.string,
  onStart: React.PropTypes.func.isRequired,
  onPause: React.PropTypes.func.isRequired,
  onResume: React.PropTypes.func.isRequired,
};

GamePanel.defaultProps = {
  nextTetromino: null,
};

export default connectLayout(GamePanel, {
  getStyles: ({ blockSize, fontSize, side, controls }) => ({
    root: {
      padding: `0 ${side.padding}px`
    },
    title: {
      fontSize: fontSize.title,
      paddingTop: side.padding
    },
    label: {
      fontSize: fontSize.default,
      paddingTop: side.padding
    },
    count: {
      fontSize: fontSize.count,
    },
    nextTetrimino: {
      width: blockSize * 4,
      height: blockSize * 4,
      marginTop: side.padding / 3
    },
    button: {
      bottom: side.padding,
      left: side.padding,
      width: blockSize * 4,
      height: blockSize * 2,
      fontSize: fontSize.button,
      lineHeight: `${blockSize * 2}px`
    }
  })
});
