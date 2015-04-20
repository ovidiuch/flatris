var React = require('react'),
    FlatrisStatePersistor = require('./components/FlatrisStatePersistor.jsx');

require('./style/reset.less');
require('./style/flatris.less');

module.exports = React.render(React.createElement(FlatrisStatePersistor, {}),
                              document.getElementById('flatris'));
