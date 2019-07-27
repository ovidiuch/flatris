// @flow

import React, { Component } from 'react';
import SquareBlock from '../SquareBlock';

import type {
  WellGrid as WellGridType,
  WellGridItem
} from 'shared/types/state';

type Props = {
  grid: WellGridType,
  blocksCleared: WellGridType,
  blocksPending: WellGridType
};

class WellGrid extends Component<Props> {
  /**
   * Grid rendering for the Tetrominoes that landed inside the Well.
   */
  shouldComponentUpdate(nextProps: Props) {
    return (
      nextProps.grid !== this.props.grid ||
      nextProps.blocksCleared !== this.props.blocksCleared ||
      nextProps.blocksPending !== this.props.blocksPending
    );
  }

  renderGridBlock(block: WellGridItem, row: number, col: number) {
    const { grid } = this.props;
    const rows = grid.length;
    const cols = grid[0].length;
    const widthPercent = 100 / cols;
    const heightPercent = 100 / rows;

    return (
      <div
        className="grid-square-block"
        key={block[0]}
        style={{
          width: `${widthPercent}%`,
          height: `${heightPercent}%`,
          top: `${row * heightPercent}%`,
          left: `${col * widthPercent}%`
        }}
      >
        <SquareBlock color={block[1]} />
        <style jsx>{`
          .grid-square-block {
            position: absolute;
            /* Square blocks will transition their "fall" when lines are cleared
            beneath them */
            transition: top 0.1s linear;
          }
        `}</style>
      </div>
    );
  }

  renderGridBlocks() {
    const { grid, blocksCleared, blocksPending } = this.props;
    const blocks = [];
    const rows = grid.length;

    grid.forEach((rowBlocks, rowIndex) => {
      rowBlocks.forEach((block, colIndex) => {
        if (block) {
          blocks.push(this.renderGridBlock(block, rowIndex, colIndex));
        }
      });
    });

    // Cleared blocks transition top-to-bottom, outside the visible grid well
    blocksCleared.forEach((rowBlocks, rowIndex) => {
      rowBlocks.forEach((block, colIndex) => {
        if (block) {
          blocks.push(this.renderGridBlock(block, rows + rowIndex, colIndex));
        }
      });
    });

    // Pending blocks transition bottom-to-top, inside the visible grid well
    blocksPending.forEach((rowBlocks, rowIndex) => {
      rowBlocks.forEach((block, colIndex) => {
        if (block) {
          blocks.push(this.renderGridBlock(block, rows + rowIndex, colIndex));
        }
      });
    });

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

export default WellGrid;
