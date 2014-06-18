/** @jsx React.DOM */

Cosmos.components.WellGrid = React.createClass({
  /**
   * Matrix for the landed Tetriminos inside the Flatris Well. Isolated from
   * the Well component because it needs to update it state as
   */
  mixins: [Cosmos.mixins.PersistState],
  getDefaultProps: function() {
    return {
      rows: Flatris.WELL_ROWS,
      cols: Flatris.WELL_COLS
    };
  },
  getInitialState: function() {
    return {
      grid: this.generateEmptyMatrix(),
      // Grid blocks need unique IDs to be used as React keys in order to tie
      // them to DOM nodes and prevent reusing them between rows when clearing
      // lines. DOM nodes need to stay the same to animate them when "falling"
      gridBlockCount: 0
    };
  },
  reset: function() {
    // This Component doesn't update after state changes by default, see
    // shouldComponentUpdate method
    this.setState({
      grid: this.generateEmptyMatrix()
    });
    this.forceUpdate();
  },
  transferTetriminoBlocksToGrid: function(tetrimino, tetriminoPositionInGrid) {
    var rows = tetrimino.state.grid.length,
        cols = tetrimino.state.grid[0].length,
        row,
        col,
        relativeRow,
        relativeCol,
        blockCount = this.state.gridBlockCount,
        lines;
    for (row = 0; row < rows; row++) {
      for (col = 0; col < cols; col++) {
        // Ignore blank squares from the Tetrimino grid
        if (!tetrimino.state.grid[row][col]) {
          continue;
        }
        relativeRow = tetriminoPositionInGrid.y + row;
        relativeCol = tetriminoPositionInGrid.x + col;
        // When the Well is full the Tetrimino will land before it enters the
        // top of the Well
        if (this.state.grid[relativeRow]) {
          this.state.grid[relativeRow][relativeCol] =
            ++blockCount + tetrimino.props.color;
        }
      }
    }
    // Clear lines created after landing and transfering a Tetrimino
    lines = this.clearLinesFromGrid(this.state.grid);
    // Push grid updates reactively and update DOM since we know for sure the
    // grid changed here
    this.setState({
      grid: this.state.grid,
      gridBlockCount: blockCount
    });
    this.forceUpdate();
    // Return lines cleared to measure success of Tetrimino landing :)
    return lines;
  },
  shouldComponentUpdate: function() {
    // Knowing that—even without DOM mutations—parsing all grid blocks is very
    // CPU expensive, we default to not calling the render() method when parent
    // Components update and only trigger render() manually when the grid
    // changes
    return false;
  },
  render: function() {
    return (
      <ul className="well-grid">
        {this.renderGridBlocks()}
      </ul>
    );
  },
  renderGridBlocks: function() {
    var blocks = [],
        widthPercent = 100 / this.props.cols,
        heightPercent = 100 / this.props.rows,
        row,
        col,
        blockValue;
    for (row = 0; row < this.props.rows; row++) {
      for (col = 0; col < this.props.cols; col++) {
        if (!this.state.grid[row][col]) {
          continue;
        }
        blockValue = this.state.grid[row][col];
        blocks.push(
          <li className="grid-square-block"
              key={this.getIdFromBlockValue(blockValue)}
              style={{
                width: widthPercent + '%',
                height: heightPercent + '%',
                top: (row * heightPercent) + '%',
                left: (col * widthPercent) + '%'
              }}>
            <Cosmos component="SquareBlock"
                    color={this.getColorFromBlockValue(blockValue)} />
          </li>
        );
      }
    }
    return blocks;
  },
  generateEmptyMatrix: function() {
    var matrix = [],
        row,
        col;
    for (row = 0; row < this.props.rows; row++) {
      matrix[row] = [];
      for (col = 0; col < this.props.cols; col++) {
        matrix[row][col] = null;
      }
    }
    return matrix;
  },
  clearLinesFromGrid: function(grid) {
    /**
     * Clear all rows that form a complete line, from one left to right, inside
     * the Well grid. Gravity is applied to fill in the cleared lines with the
     * ones above, thus freeing up the Well for more Tetriminos to enter.
     */
    var linesCleared = 0,
        isLine,
        row,
        col;
    for (row = this.props.rows - 1; row >= 0; row--) {
      isLine = true;
      for (col = this.props.cols - 1; col >= 0; col--) {
        if (!grid[row][col]) {
          isLine = false;
        }
      }
      if (isLine) {
        this.removeGridRow(row);
        linesCleared++;
        // Go once more through the same row
        row++;
      }
    }
    return linesCleared;
  },
  removeGridRow: function(rowToRemove) {
    /**
     * Remove a row from the Well grid by descending all rows above, thus
     * overriding it with the previous row.
     */
    var row,
        col;
    for (row = rowToRemove; row >= 0; row--) {
      for (col = this.props.cols - 1; col >= 0; col--) {
        this.state.grid[row][col] = row ? this.state.grid[row - 1][col] : null;
      }
    }
  },
  getIdFromBlockValue: function(blockValue) {
    return blockValue.split('#')[0];
  },
  getColorFromBlockValue: function(blockValue) {
    return '#' + blockValue.split('#')[1];
  }
});
