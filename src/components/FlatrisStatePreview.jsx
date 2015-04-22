var React = require('react'),
    ComponentTree = require('react-component-tree'),
    FlatrisGame = require('./FlatrisGame.jsx');

require('./FlatrisStatePreview.less');

class FlatrisStatePreview extends ComponentTree.Component {
  /**
   * Render a Flatris instance next to its prettified, serialized state.
   */
  constructor() {
    super();

    this.refreshSnapshot = this.refreshSnapshot.bind(this);

    this.state = {
      snapshot: '{}'
    };

    this.children = {
      flatris: function() {
        return {
          component: FlatrisGame
        };
      }
    };
  }

  render() {
    return <div className="flatris-state-preview">
      {this.loadChild('flatris')}
      <pre className="state-preview">{this.state.snapshot}</pre>
    </div>;
  }

  componentDidMount() {
    this.refreshSnapshot();
    this._intervalId = setInterval(this.refreshSnapshot, 200);
  }

  shouldComponentUpdate(nextProps, nextState) {
    // No need to render for an identical snapshot
    return nextState.snapshot != this.state.snapshot;
  }

  componentWillUnmount() {
    clearInterval(this._intervalId);
  }

  refreshSnapshot() {
    this.setState({
      snapshot: this._serializeState(
          ComponentTree.serialize(this.refs.flatris))
    });
  }

  _serializeState(snapshot) {
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
}

module.exports = FlatrisStatePreview;
