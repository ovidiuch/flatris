import React from 'react';
import PropTypes from 'prop-types';
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
    return nextProps.grid !== this.props.grid ||
      nextProps.activeTetromino !== this.props.activeTetromino ||
      nextProps.activeTetrominoGrid !== this.props.activeTetrominoGrid ||
      nextProps.activeTetrominoPosition !== this.props.activeTetrominoPosition;
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
      top: `${100 / rows * y}%`,
      left: `${100 / cols * x}%`,
      width: `${100 / cols * 4}%`,
      height: `${100 / rows * 4}%`
    };
  }

  render() {
    const {
      grid,
      activeTetromino,
      activeTetrominoGrid
    } = this.props;

    return (
      <div className="well">
        {activeTetromino
          ? <div
              className="active-tetromino"
              style={this.getActiveTetrominoestyles()}
            >
              <Tetromino
                color={COLORS[activeTetromino]}
                grid={activeTetrominoGrid}
              />
            </div>
          : null}
        <WellGrid grid={grid} />
      </div>
    );
  }
}

Well.propTypes = {
  grid: PropTypes.arrayOf(
    PropTypes.arrayOf(PropTypes.array)
  ).isRequired,
  activeTetromino: PropTypes.string,
  activeTetrominoGrid: PropTypes.arrayOf(
    PropTypes.arrayOf(PropTypes.number)
  ),
  activeTetrominoPosition: PropTypes.shape({
    x: PropTypes.number,
    y: PropTypes.number
  })
};

Well.defaultProps = {
  activeTetromino: null,
  activeTetrominoGrid: null,
  activeTetrominoPosition: null
};

export default Well;
