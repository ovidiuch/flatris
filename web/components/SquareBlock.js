import React from 'react';
import PropTypes from 'prop-types';

/**
 * Building block for Tetrominoes and the grid of the Well, occupying a 1x1
 * square block. The only configurable property square blocks have is their
 * color.
 */
const SquareBlock = ({ color }) => (
  <div className="square-block" style={{ backgroundColor: color }}>
    <style jsx>{`
      .square-block {
        position: absolute;
        width: 100%;
        height: 100%;
      }
    `}</style>
  </div>
);

SquareBlock.propTypes = {
  color: PropTypes.string.isRequired
};

export default SquareBlock;
