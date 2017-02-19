import React from 'react';

const getWindowSize = () => ({
  width: document.body.clientWidth || window.innerHeight, // fallback for jsdom
  height: window.innerHeight,
});

export default class LayoutProvider extends React.Component {
  constructor(props) {
    super(props);

    this.handleResize = this.handleResize.bind(this);
    this.state = getWindowSize();
    this.layout = props.computeLayout(this.state);
  }

  componentDidMount() {
    window.addEventListener('resize', this.handleResize);
  }

  componentWillUpdate(nextProps, nextState) {
    this.layout = nextProps.computeLayout(nextState);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
  }

  getChildContext() {
    return {
      layout: this.layout,
    };
  }

  handleResize() {
    this.setState(getWindowSize());
  }

  render() {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
}

LayoutProvider.propTypes = {
  computeLayout: React.PropTypes.func.isRequired
};

LayoutProvider.childContextTypes = {
  layout: React.PropTypes.object
};
