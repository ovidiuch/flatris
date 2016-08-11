var React = require('react'),
    ReactDOM = require('react-dom'),
    ComponentTree = require('react-component-tree'),
    FlatrisStatePersistor = require('./components/FlatrisStatePersistor.jsx');

exports.rootComponent = ReactDOM.render(
    React.createElement(FlatrisStatePersistor, {}),
    document.getElementById('root'));

exports.serialize = function() {
  return ComponentTree.serialize(exports.rootComponent);
};
