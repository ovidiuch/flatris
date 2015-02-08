/** @jsx React.DOM */

Flatris.components.FlatrisStatePreview = React.createClass({
  /**
   * Render a Flatris instance next to its prettified, serialized state
   */
  mixins: [Cosmos.mixins.ComponentTree],

  getInitialState: function() {
    return {
      shapshot: '{}'
    };
  },

  children: {
    flatris: function() {
      return {
        component: 'FlatrisGame'
      };
    }
  },

  render: function() {
    return (
      <div className="flatris-state-preview">
        {this.loadChild('flatris')}
        <pre className="state-preview">{this.state.snapshot}</pre>
      </div>
    );
  },

  componentDidMount: function() {
    this.refreshSnapshot();
    this._intervalId = setInterval(this.refreshSnapshot, 200);
  },

  shouldComponentUpdate: function(nextProps, nextState) {
    // No need to render for an identical snapshot
    return nextState.snapshot != this.state.snapshot;
  },

  componentWillUnmount: function() {
    clearInterval(this._intervalId);
  },

  refreshSnapshot: function() {
    this.setState({
      snapshot: this.serializeState(this.refs.flatris.serialize(true))
    });
  },

  serializeState: function(snapshot) {
    /**
     * This ugly method styles the indenting of the stringified state JSON.
     */
    var snapshot = JSON.stringify(snapshot, null, '  ');
    // Style the Well and the active Tetrimino grid with one row per line
    snapshot = snapshot.replace(/\n([\s]+)"grid"\: ([\s\S]+?)\]([\s]+)\]/g,
      function(match, indent, grid, after) {
        grid = grid.replace(new RegExp('\\[\n' + indent + '    ', 'g'), '[');
        grid = grid.replace(new RegExp(',\n' + indent + '    ', 'g'), ', ');
        grid = grid.replace(new RegExp('\n' + indent + '  (\\]|$)', 'g'), '$1');
        return '\n' + indent + '"grid": ' + grid + ']' + after + ']';
      }
    );
    return snapshot;
  }
});
