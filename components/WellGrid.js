import React from 'react';
import PropTypes from 'prop-types';
import SquareBlock from './SquareBlock';

class WellGrid extends React.Component {
  /**
   * Grid rendering for the Tetrominoes that landed inside the Well.
   */
  shouldComponentUpdate(nextProps) {
    return nextProps.grid !== this.props.grid;
  }

  renderGridBlocks() {
    const blocks = [];
    const rows = this.props.grid.length;
    const cols = this.props.grid[0].length;
    const widthPercent = 100 / cols;
    const heightPercent = 100 / rows;
    let blockValue;

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        if (this.props.grid[row][col]) {
          blockValue = this.props.grid[row][col];
          blocks.push(
            <div
              className="grid-square-block"
              key={blockValue[0]}
              style={{
                width: `${widthPercent}%`,
                height: `${heightPercent}%`,
                top: `${row * heightPercent}%`,
                left: `${col * widthPercent}%`
              }}
            >
              <SquareBlock color={blockValue[1]} />
              <style jsx>{`
                .grid-square-block {
                  position: absolute;
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
      <div className="well-grid">
        {this.renderGridBlocks()}
        <style jsx>{`
          .well-grid {
            position: absolute;
            width: 100%;
            height: 100%;
          }
        `}</style>
      </div>
    );
  }
}

WellGrid.propTypes = {
  grid: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.array)).isRequired
};

export default WellGrid;
