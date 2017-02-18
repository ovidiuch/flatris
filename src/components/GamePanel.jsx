import React from 'react';
import { STOPPED, PLAYING, PAUSED } from '../constants/states';
import { SHAPES, COLORS } from '../constants/tetromino';
import { attachPointerDownEvent } from '../lib/events';
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

    return React.createElement(Button, attachPointerDownEvent(eventHandler), label);
  }

  render() {
    const {
      score,
      lines,
      nextTetromino,
    } = this.props;

    return (
      <div className="game-panel">
        <p className="title">Flatris</p>
        <p className="label">Score</p>
        <p className="count">{score}</p>
        <p className="label">Lines Cleared</p>
        <p className="count">{lines}</p>
        <p className="label">Next Shape</p>
        <div className={this.getNextTetrominoClass()}>
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

export default GamePanel;
