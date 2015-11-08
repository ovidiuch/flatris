var React = require('react'),
    ComponentTree = require('react-component-tree'),
    FlatrisStatePersistor = require('./components/FlatrisStatePersistor.jsx');

exports.rootComponent = React.render(
    React.createElement(FlatrisStatePersistor, {}),
    document.getElementById('root'));

exports.serialize = function() {
  return ComponentTree.serialize(exports.rootComponent);
};
