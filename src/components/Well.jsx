import React from 'react';
import { COLORS } from '../constants/tetromino';
import { getExactPosition } from '../lib/grid';
import WellGrid from './WellGrid';
import Tetromino from './Tetromino';

import './Well.css';

class Well extends React.Component {
  /**
   * A rectangular vertical shaft, where Tetrominoes fall into during a Flatris
   * game. The Well has configurable size and speed. Tetromino pieces can be
   * inserted inside the well and they will fall until they hit the bottom, and
   * eventually fill it. Whenever the pieces form a straight horizontal line it
   * will be cleared, emptying up space and allowing more pieces to enter
   * afterwards.
   */
  shouldComponentUpdate(nextProps) {
    return (
      nextProps.grid !== this.props.grid ||
      nextProps.activeTetromino !== this.props.activeTetromino ||
      nextProps.activeTetrominoGrid !== this.props.activeTetrominoGrid ||
      nextProps.activeTetrominoPosition !== this.props.activeTetrominoPosition
    );
  }

  getNumberOfRows() {
    return this.props.grid.length;
  }

  getNumberOfCols() {
    return this.props.grid[0].length;
  }

  getActiveTetrominoestyles() {
    const rows = this.getNumberOfRows();
    const cols = this.getNumberOfCols();
    const { x, y } = getExactPosition(this.props.activeTetrominoPosition);

    return {
      top: `${(100 / rows) * y}%`,
      left: `${(100 / cols) * x}%`,
      width: `${(100 / cols) * 4}%`,
      height: `${(100 / rows) * 4}%`,
    };
  }

  render() {
    return (
      <div className="well">
        {this.props.activeTetromino ? (
          <div
            className="active-tetromino"
            style={this.getActiveTetrominoestyles()}
          >
            <Tetromino
              color={COLORS[this.props.activeTetromino]}
              grid={this.props.activeTetrominoGrid}
            />
          </div>
        ) : null}
        <WellGrid
          grid={this.props.grid}
        />
      </div>
    );
  }
}

Well.propTypes = {
  grid: React.PropTypes.arrayOf(
    React.PropTypes.arrayOf(React.PropTypes.array),
  ).isRequired,
  activeTetromino: React.PropTypes.string,
  activeTetrominoGrid: React.PropTypes.arrayOf(
    React.PropTypes.arrayOf(React.PropTypes.number),
  ),
  activeTetrominoPosition: React.PropTypes.shape({
    x: React.PropTypes.number,
    y: React.PropTypes.number,
  }),
};

Well.defaultProps = {
  activeTetromino: null,
  activeTetrominoGrid: null,
  activeTetrominoPosition: null,
};

export default Well;
