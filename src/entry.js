var React = require('react'),
    ComponentTree = require('react-component-tree');
    FlatrisStatePersistor = require('./components/FlatrisStatePersistor.jsx');

require('./style/reset.less');
require('./style/flatris.less');

exports.rootComponent = React.render(
    React.createElement(FlatrisStatePersistor, {}),
    document.getElementById('flatris'));

exports.serialize = function() {
  return ComponentTree.serialize(exports.rootComponent);
};
