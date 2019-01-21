import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SquareBlock from '../SquareBlock';

export default class Tetromino extends Component {
  static propTypes = {
    color: PropTypes.string.isRequired,
    grid: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)).isRequired
  };

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
            <div
              className="grid-square-block"
              key={`${row}-${col}`}
              style={{
                top: `${row * 25}%`,
                left: `${col * 25}%`
              }}
            >
              <SquareBlock color={this.props.color} />
              <style jsx>{`
                .grid-square-block {
                  position: absolute;
                  width: 25%;
                  height: 25%;
                }
              `}</style>
            </div>
          );
        }
      }
    }

    return blocks;
  }

  render() {
    return (
      <div className="tetromino">
        {this.renderGridBlocks()}
        <style jsx>{`
          .tetromino {
            position: absolute;
            width: 100%;
            height: 100%;
          }
        `}</style>
      </div>
    );
  }
}
