import React from 'react';
import PropTypes from 'prop-types';
import SquareBlock from './SquareBlock';

import './Tetromino.css';

class Tetromino extends React.Component {
  /**
   * A Tetromino is a geometric shape composed of four squares, connected
   * orthogonally. Read more at http://en.wikipedia.org/wiki/Tetromino
   */
  renderGridBlocks() {
    const blocks = [];
    const rows = this.props.grid.length;
    const cols = this.props.grid[0].length;

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        if (this.props.grid[row][col]) {
          blocks.push(
            <li
              className="grid-square-block"
              key={`${row}-${col}`}
              style={{
                top: `${row * 25}%`,
                left: `${col * 25}%`
              }}
            >
              <SquareBlock color={this.props.color} />
            </li>
          );
        }
      }
    }

    return blocks;
  }

  render() {
    return <ul className="tetromino">{this.renderGridBlocks()}</ul>;
  }
}

Tetromino.propTypes = {
  color: PropTypes.string.isRequired,
  grid: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)).isRequired
};

export default Tetromino;
