/** @jsx React.DOM */

Cosmos.components.FlatrisStatePersistor = React.createClass({
  /**
   * Persist Flatris state with local storage.
   */
  mixins: [Cosmos.mixins.PersistState],
  children: {
    flatrisStatePreview: function() {
      // Unload previous state from local storage if present, otherwise
      // generate a blank Flatris instance
      var prevState = localStorage.getItem('flatrisState');
      if (prevState) {
        return JSON.parse(prevState);
      } else {
        return {
          component: 'FlatrisStatePreview'
        };
      }
    }
  },
  componentDidMount: function() {
    $(window).on('unload', this.onUnload);
  },
  componentWillUnmount: function() {
    $(window).off('unload', this.onUnload);
  },
  render: function() {
    return this.loadChild('flatrisStatePreview');
  },
  onUnload: function() {
    var snapshot = this.refs.flatrisStatePreview.generateSnapshot(true);
    localStorage.setItem('flatrisState', JSON.stringify(snapshot));
  }
});
