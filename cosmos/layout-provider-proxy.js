import React from 'react';
import LayoutProvider from '../src/lib/layout-provider';
import computeLayout from '../src/layout';

class LayoutProviderProxy extends React.Component {
  render() {
    const {
      nextProxy
    } = this.props;

    return (
      <LayoutProvider computeLayout={computeLayout}>
        {React.createElement(nextProxy.value, {
          ...this.props,
          nextProxy: nextProxy.next()
        })}
      </LayoutProvider>
    );
  }
}

LayoutProviderProxy.propTypes = {
  nextProxy: React.PropTypes.shape({
    value: React.PropTypes.func,
    next: React.PropTypes.func
  }).isRequired
};

export default () => LayoutProviderProxy;
