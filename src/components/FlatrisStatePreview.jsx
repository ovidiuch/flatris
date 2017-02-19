import React from 'react';
import { connect } from 'react-redux';
import connectLayout from '../lib/layout-connect';

import './FlatrisStatePreview.css';

const gridPattern = /\n([\s]+)"(grid|activeTetrominoGrid)": ([\s\S]+?)(\]([\s]+)\],[\s]+")/g;

const prettifyGrid = (grid, indent) => {
  return grid
    // Smoke & mirrors!
    .replace(
      new RegExp(
        '\\[[\\s]+([0-9]+),[\\s\\n]+("#[a-z0-9]{6}")[\\s\\n]+\\]',
        'g'
      ),
      '$2'
    )
    .replace(new RegExp('\\[\n' + indent + '    ', 'g'), '[ ')
    .replace(new RegExp(',\n' + indent + '    ', 'g'), ', ')
    .replace(new RegExp('\n' + indent + '  (\\]|$)', 'g'), ' $1');
};

const prettifyState = state => {
  /**
   * This ugly method styles the indenting of the stringified state JSON.
   */
  // Style the Well and the active Tetromino grid with one row per line
  return JSON.stringify(state, null, '  ')
    .replace(
      gridPattern,
      (match, indent, key, grid, after) =>
        `\n${indent}"${key}": ${prettifyGrid(grid, indent)}${after}`
    );
};

/**
 * Render the prettified, serialized state of a Flatris instance.
 */
const FlatrisStatePreview = ({ state, styles }) => (
  <pre className="flatris-state-preview" style={styles.root}>
    {prettifyState(state)}
  </pre>
);

const mapStateToProps = state => ({ state });

const container = connect(mapStateToProps)(FlatrisStatePreview);

export default connectLayout(container, {
  getStyles: ({ code }) => ({
    root: {
      fontSize: code.fontSize,
      padding: code.padding
    }
  })
});
