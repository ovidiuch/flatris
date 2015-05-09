var React = require('react'),
    ComponentTree = require('react-component-tree'),
    constants = require('../constants.js'),
    SquareBlock = require('./SquareBlock.jsx');

require('./Tetrimino.less');

class Tetrimino extends ComponentTree.Component {
  /**
   * A Tetromino is a geometric shape composed of four squares, connected
   * orthogonally. Read more at http://en.wikipedia.org/wiki/Tetromino
   */
  constructor() {
    super();

    this.state = {
      grid: constants.SHAPES.T
    };

    this.children = {
      squareBlock: function(col, row) {
        return {
          component: SquareBlock,
          ref: 'c' + col + 'r' + row,
          color: this.props.color
        };
      }
    };
  }

  render() {
    return <ul className="tetrimino">
      {this._renderGridBlocks()}
    </ul>;
  }

  _renderGridBlocks() {
    var blocks = [],
        rows = this.state.grid.length,
        cols = this.state.grid[0].length,
        row,
        col;

    for (row = 0; row < rows; row++) {
      for (col = 0; col < cols; col++) {
        if (this.state.grid[row][col]) {
          blocks.push(
            <li className="grid-square-block"
                key={row + '-' + col}
                style={{
                  top: (row * 25) + '%',
                  left: (col * 25) + '%'
                }}>
              {this.loadChild('squareBlock', col, row)}
            </li>
          );
        }
      }
    }

    return blocks;
  }

  getNumberOfCells() {
    // TODO: Count actual cells (so far all Tetriminos have 4 cells)
    return 4;
  }
}

Tetrimino.defaultProps = {
  color: constants.COLORS.T
};

module.exports = Tetrimino;
