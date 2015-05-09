var React = require('react'),
    _ = require('lodash'),
    $ = require('jquery'),
    ComponentTree = require('react-component-tree'),
    FlatrisGame = require('./FlatrisGame.jsx'),
    FlatrisStatePreview = require('./FlatrisStatePreview.jsx');

require('./FlatrisStatePersistor.less');

class FlatrisStatePersistor extends ComponentTree.Component {
  /**
   * Persist Flatris state with local storage.
   */
  constructor() {
    super();

    this.refreshSnapshot = this.refreshSnapshot.bind(this);
    this.onUnload = this.onUnload.bind(this);

    this.state = {
      snapshot: {}
    };

    this.children = {
      flatris: function() {
        return {
          component: FlatrisGame
        };
      },
      flatrisStatePreview: function() {
        return {
          component: FlatrisStatePreview,
          snapshot: this.state.snapshot
        };
      }
    };
  }

  render() {
    return <div className="flatris-state-persistor">
      {this.loadChild('flatris')}
      {this.loadChild('flatrisStatePreview')}
    </div>
  }

  componentDidMount() {
    $(window).on('unload', this.onUnload);

    // Unload previous state from local storage if present, otherwise
    // a blank Flatris instance will be rendered
    var prevState = localStorage.getItem('flatrisState1');
    if (prevState) {
      ComponentTree.injectState(this.refs.flatris, JSON.parse(prevState));
    }

    this._refreshInterval = setInterval(this.refreshSnapshot, 200);
  }

  componentWillUnmount() {
    $(window).off('unload', this.onUnload);

    clearInterval(this._refreshInterval);
  }

  refreshSnapshot() {
    this.setState({snapshot: ComponentTree.serialize(this.refs.flatris)});
  }

  onUnload() {
    var snapshot = ComponentTree.serialize(this.refs.flatris);
    localStorage.setItem('flatrisState1', JSON.stringify(snapshot.state));
  }
}

module.exports = FlatrisStatePersistor;
