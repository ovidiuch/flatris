var React = require('react');

require('./FlatrisStatePreview.less');

class FlatrisStatePreview extends React.Component {
  /**
   * Render the prettified, serialized state of a Flatris instance.
   */
  render() {
    return <pre className="flatris-state-preview">
      {this._prettifyState(this.props.snapshot)}
    </pre>;
  }

  _prettifyState(snapshot) {
    /**
     * This ugly method styles the indenting of the stringified state JSON.
     */
    var snapshot = JSON.stringify(snapshot, null, '  ');
    // Style the Well and the active Tetrimino grid with one row per line
    snapshot = snapshot.replace(gridPattern,
      function(match, indent, key, grid, after) {
        grid = grid.replace(new RegExp('\\[\n' + indent + '    ', 'g'), '[');
        grid = grid.replace(new RegExp(',\n' + indent + '    ', 'g'), ', ');
        grid = grid.replace(new RegExp('\n' + indent + '  (\\]|$)', 'g'), '$1');
        return '\n' + indent + '"' + key + '": ' + grid + ']' + after + ']';
      }
    );
    return snapshot;
  }
}

var gridPattern =
    /\n([\s]+)"(grid|activeTetriminoGrid)"\: ([\s\S]+?)\]([\s]+)\]/g;

module.exports = FlatrisStatePreview;
