import React from 'react';
import { string, number, func, oneOf } from 'prop-types';
import { STOPPED, PLAYING, PAUSED } from '../constants/states';
import { SHAPES, COLORS } from '../constants/tetromino';
import { attachPointerDownEvent } from '../utils/events';
import Tetromino from './Tetromino';
import Button from './Button';

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
    const { gameState, onStart, onPause, onResume } = this.props;

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

    return <Button {...attachPointerDownEvent(eventHandler)}>{label}</Button>;
  }

  render() {
    const { score, lines, nextTetromino } = this.props;

    return (
      <div className="game-panel">
        <div className="title">Flatris</div>
        <div className="label score-label">Score</div>
        <div className="count score-count">{score}</div>
        <div className="label lines-label">Lines Cleared</div>
        <div className="count lines-count">{lines}</div>
        <div className="label next-label">Next Shape</div>
        <div className={this.getNextTetrominoClass()}>
          {nextTetromino ? (
            <Tetromino
              key={nextTetromino}
              color={COLORS[nextTetromino]}
              grid={SHAPES[nextTetromino]}
            />
          ) : null}
        </div>
        <div className="game-button">{this.renderGameButton()}</div>
        <style jsx>{`
          .game-panel {
            position: absolute;
            top: 0;
            bottom: 0;
            left: 0;
            right: 0;
            color: #34495f;
          }

          .game-panel > div {
            position: absolute;
            left: calc(100% / 6);
            right: calc(100% / 6);
          }

          .title {
            color: #34495f;
            font-weight: normal;
            font-size: 2em;
            line-height: 1.5em;
          }

          .label {
            color: #9ba4ab;
            font-size: 1em;
            font-weight: 300;
            white-space: nowrap;
            padding-top: 0.25em;
          }

          .count {
            color: #3993d0;
            font-size: 2em;
            font-weight: 400;
            white-space: nowrap;
          }

          .game-button :global(button) {
            font-size: 1em;
          }

          .next-tetromino {
            padding-top: 0.25em;
          }

          .next-tetromino :global(.square-block) {
            /* Override any color the next Tetromino has for a gray shape */
            background-color: #ecf0f1 !important;
          }

          /* The I Tetromino needs to be lifted a bit because it has an empty row
            in its default position */
          .next-tetromino-I {
            transform: translate(0, -25%);
          }

          .title {
            top: calc(100% / 20);
          }
          .score-label {
            top: calc(100% * 3 / 20);
          }

          .score-count {
            top: calc(100% * 4 / 20);
          }

          .lines-label {
            top: calc(100% * 6 / 20);
          }

          .lines-count {
            top: calc(100% * 7 / 20);
          }

          .next-label {
            top: calc(100% * 9 / 20);
          }

          .next-tetromino {
            top: calc(100% * 10 / 20);
            width: calc(100% * 4 / 6);
            height: calc(100% * 4 / 20);
          }

          .game-button {
            height: calc(100% * 2 / 20);
            bottom: calc(100% / 20);
          }
        `}</style>
      </div>
    );
  }
}

GamePanel.propTypes = {
  gameState: oneOf([STOPPED, PLAYING, PAUSED]).isRequired,
  score: number.isRequired,
  lines: number.isRequired,
  nextTetromino: string,
  onStart: func.isRequired,
  onPause: func.isRequired,
  onResume: func.isRequired
};

GamePanel.defaultProps = {
  nextTetromino: null
};

export default GamePanel;
