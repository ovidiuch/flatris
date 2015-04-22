var React = require('react'),
    _ = require('lodash'),
    $ = require('jquery'),
    ComponentTree = require('react-component-tree'),
    FlatrisStatePreview = require('./FlatrisStatePreview.jsx');

class FlatrisStatePersistor extends ComponentTree.Component {
  /**
   * Persist Flatris state with local storage.
   */
  constructor() {
    super();

    this.onUnload = this.onUnload.bind(this);

    this.children = {
      flatrisStatePreview: function() {
        return {
          component: FlatrisStatePreview
        };
      }
    };
  }

  render() {
    return this.loadChild('flatrisStatePreview');
  }

  componentDidMount() {
    $(window).on('unload', this.onUnload);

    // Unload previous state from local storage if present, otherwise
    // a blank Flatris instance will be rendered
    var prevState = localStorage.getItem('flatrisState');
    if (prevState) {
      ComponentTree.injectState(this.refs.flatrisStatePreview,
                                JSON.parse(prevState));
    }
  }

  componentWillUnmount() {
    $(window).off('unload', this.onUnload);
  }

  onUnload() {
    var snapshot = ComponentTree.serialize(this.refs.flatrisStatePreview);
    localStorage.setItem('flatrisState', JSON.stringify(snapshot.state));
  }
}

module.exports = FlatrisStatePersistor;
