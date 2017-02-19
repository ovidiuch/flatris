import React from 'react';

// Colocates global layout data with components
export default (Component, { getStyles }) => {
  class LayoutConnect extends React.Component {
    render() {
      return React.createElement(Component, {
        ...this.props,
        styles: getStyles(this.context.layout)
      });
    }
  }

  LayoutConnect.contextTypes = {
    layout: React.PropTypes.object
  };

  return LayoutConnect;
};
