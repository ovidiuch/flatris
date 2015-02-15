(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module
    define(['react', 'lodash'], factory);
  } else if (typeof exports === 'object') {
    // Node. Does not work with strict CommonJS, but only CommonJS-like
    // environments that support module.exports, like Node
    module.exports = factory(require('react/addons'),
                             require('lodash'));
  } else {
    // Browser globals (root is window)
    root.Cosmos = factory(root.React, root._);
  }
}(this, function(React, _) {

var Cosmos = function(props) {
  // XXX: Deprecated, remove in future versions
  return Cosmos.createElement(props);
};

_.extend(Cosmos, {
  mixins: {},
  components: {},
  transitions: {},

  start: function(defaultProps, options) {
    return new this.Router(defaultProps, options);
  },

  render: function(props, container, callback) {
    var componentInstance = this.createElement(props);

    if (container) {
      return React.render(componentInstance, container, callback);
    } else {
      return React.renderToString(componentInstance);
    }
  },

  createElement: function(props) {
    var ComponentClass = this.getComponentByName(props.component,
                                                 props.componentLookup);

    if (!_.isFunction(ComponentClass)) {
      throw new Error('Invalid component: ' + props.component);
    }

    return React.createElement(ComponentClass, props);
  },

  getComponentByName: function(name, componentLookup) {
    if (_.isFunction(componentLookup)) {
      var ComponentClass = componentLookup(name);

      // Fall back to the Cosmos.components namespace if the lookup doesn't
      // return anything. Needed for exposing built-in components in Cosmos
      if (ComponentClass) {
        return ComponentClass;
      };
    }

    return this.components[name];
  }
});

Cosmos.Router = function(defaultProps, options) {
  this._defaultProps = defaultProps || {};
  this._options = _.extend({
    container: document.body
  }, options);

  this.onPopState = this.onPopState.bind(this);
  this._bindPopStateEvent();

  // The initial render is done instantly when the Router instance is created
  this._load(Cosmos.url.getParams(), window.location.href);
};

_.extend(Cosmos.Router, {
  prototype: {
    stop: function() {
      this._unbindPopStateEvent();
    },

    goTo: function(href) {
      // Old-school refreshes are made when pushState isn't supported
      if (!Cosmos.url.isPushStateSupported()) {
        window.location = href;
        return;
      }

      // The history entry for the previous component is updated with its
      // lastest props and state, so that we resume it its exact form when/if
      // going back
      if (this.rootComponent) {
        var snapshot = this.rootComponent.serialize(true);
        this._replaceHistoryState(this._excludeDefaultProps(snapshot),
                                  this._currentHref);
      }

      var queryString = href.split('?').pop(),
          props = Cosmos.serialize.getPropsFromQueryString(queryString);

      // The callback has the component as the context
      var _this = this;
      this._load(props, href, function() {
        // Calling pushState programatically doesn't trigger the onpopstate
        // event, only a browser page change does. Otherwise this would've
        // triggered an infinite loop.
        // https://developer.mozilla.org/en-US/docs/Web/API/window.onpopstate
        var snapshot = this.serialize(true);
        _this._pushHistoryState(_this._excludeDefaultProps(snapshot), href);
      });
    },

    onPopState: function(e) {
      // Chrome & Safari trigger an empty popState event initially, while
      // Firefox doesn't, we choose to ignore that event altogether
      if (!e.state) {
        return;
      }
      this._load(e.state, window.location.href);
    },

    _load: function(newProps, href, callback) {
      var baseProps = {
        // Always send the components a reference to the router. This makes it
        // possible for a component to change the page through the router and
        // not have to rely on any sort of globals
        router: this,
        // Use the href as an identifier for the component. This is useful when
        // browsing between more instances of the same component after the
        // router cached state for each. Without the unique key prop the
        // component would be updated through componentWillReceiveProps and the
        // cached state would be ignored
        key: href
      };
      var props = _.extend(baseProps, this._defaultProps, newProps);

      // The router exposes the instance of the currently rendered component
      this.rootComponent = Cosmos.render(props,
                                         this._options.container,
                                         callback);

      // We use the current href when updating the current history entry
      this._currentHref = href;

      if (_.isFunction(this._options.onChange)) {
        this._options.onChange.call(this, newProps);
      }
    },

    _bindPopStateEvent: function() {
      window.addEventListener('popstate', this.onPopState);
    },

    _unbindPopStateEvent: function() {
      window.removeEventListener('popstate', this.onPopState);
    },

    _replaceHistoryState: function(state, url) {
      window.history.replaceState(state, '', url);
    },

    _pushHistoryState: function(state, url) {
      window.history.pushState(state, '', url);
    },

    _excludeDefaultProps: function(props) {
      var newProps = {},
          value;

      for (var key in props) {
        // Ignore the Router reference because it gets attached automatically
        // when sending new props to a component
        if (key === 'router') {
          continue;
        }

        value = props[key];

        if (value !== this._defaultProps[key]) {
          newProps[key] = value;
        }
      }

      return newProps;
    }
  }
});

Cosmos.serialize = {
  getPropsFromQueryString: function(queryString) {
    var props = {};

    if (!queryString.length) {
      return props;
    }

    var pairs = queryString.split('&'),
        parts,
        key,
        value;

    for (var i = 0; i < pairs.length; i++) {
      parts = pairs[i].split('=');
      key = parts[0];
      value = decodeURIComponent(parts[1]);

      try {
        value = JSON.parse(value);
      } catch(e) {
        // If the prop was a simple type and not a stringified JSON it will
        // keep its original value
      }

      props[key] = value;
    }

    return props;
  },

  getQueryStringFromProps: function(props) {
    var parts = [],
        value;

    for (var key in props) {
      value = props[key];

      // Objects can be embedded in a query string as well
      if (typeof value == 'object') {
        try {
          value = JSON.stringify(value);
        } catch(e) {
          // Props that can't be stringified should be ignored
          continue;
        }
      }

      parts.push(key + '=' + encodeURIComponent(value));
    }

    return parts.join('&');
  }
};

Cosmos.url = {
  getParams: function() {
    return Cosmos.serialize.getPropsFromQueryString(
      window.location.search.substr(1));
  },
  
  isPushStateSupported: function() {
    return !!window.history.pushState;
  }
};

Cosmos.mixins.ClassName = {
  getClassName: function(defaultClassName) {
    if (this.props.className !== undefined) {
      return this.props.className;
    }
    return defaultClassName;
  }
};

Cosmos.mixins.ComponentTree = {
  /**
   * Heart of the Cosmos framework. Links components with their children
   * recursively. This makes it possible to inject nested state intro a tree of
   * compoents, as well as serializing them into a single snapshot.
   */
  serialize: function(recursive) {
    /**
     * Generate a snapshot with the the props and state of a component
     * combined, including the state of all nested child components.
     */
    // Current state should be used instead of initial one
    var snapshot = _.omit(this.props, 'state'),
        // Omit any child state that was previously passed through props
        state = _.omit(this.state, 'children'),
        children = {},
        childSnapshot;

    if (recursive) {
      _.each(this.refs, function(child, ref) {
        // We can only nest child state if the child component also uses the
        // ComponentTree mixin
        if (_.isFunction(child.serialize)) {
          childSnapshot = child.serialize(true);

          if (!_.isEmpty(childSnapshot.state)) {
            children[ref] = childSnapshot.state;
          }
        }
      });

      if (!_.isEmpty(children)) {
        state.children = children;
      }
    }

    // There's no point in attaching the state key if the component nor its
    // children have any state
    if (!_.isEmpty(state)) {
      snapshot.state = state;
    }

    return snapshot;
  },

  loadChild: function() {
    var childProps = this.getChildProps.apply(this, arguments);

    if (childProps) {
      try {
        return Cosmos.createElement(childProps);
      } catch (e) {
        console.error(e);
      }
    }

    // Return null won't render any node
    return null;
  },

  getChildProps: function(name) {
    /**
     * @param {String} name Key that corresponds to the child component we want
     *                      to get the props for
     * @param {...*} [arguments] Optional extra arguments get passed to the
     *                           function that returns the component props
     */
    // https://github.com/petkaantonov/bluebird/wiki/Optimization-killers#32-leaking-arguments
    var args = [];
    for (var i = 1; i < arguments.length; ++i) {
      args[i - 1] = arguments[i];
    }

    // The .children object on a component class contains a hash of functions.
    // Keys in this hash represent the name and by default the *refs* of child
    // components (unless changed via optional arguments passed in) and their
    // values are functions that return props for each of those child
    // components.
    var props = this.children[name].apply(this, args);
    if (!props) {
      return;
    }

    if (!props.ref) {
      props.ref = name;
    }

    // A tree of states can be embeded inside a single (root) component input,
    // trickling down recursively all the way to the tree leaves. Child states
    // are set inside the .children key of the parent component's state, as a
    // hash with keys corresponding to component *refs*. These preset states
    // will be overriden with those generated at run-time.
    if (this._childSnapshots && this._childSnapshots[props.ref]) {
      props.state = this._childSnapshots[props.ref];
    }

    if (this.props.componentLookup) {
      props.componentLookup = this.props.componentLookup;
    }

    return props;
  },

  componentWillMount: function() {
    // Allow passing of a serialized state snapshot through props
    if (this.props.state) {
      this._loadStateSnapshot(this.props.state);
    }
  },

  componentDidMount: function() {
    this._clearChildSnapshots();
  },

  _loadStateSnapshot: function(newState) {
    // Child snapshots are read and flushed on every render (through the
    // .children functions)
    if (newState.children) {
      this._childSnapshots = newState.children;
    }

    var defaultState = {};

    // Allowing the new state to extend the initial set improves the brevity
    // of component fixtures
    if (_.isFunction(this.getInitialState)) {
      _.extend(defaultState, this.getInitialState());
    }

    this.replaceState(_.extend(defaultState, newState));
  },

  _clearChildSnapshots: function() {
    // Child snapshots are only used for first render after which organic
    // states are formed
    if (this._childSnapshots !== undefined) {
      this._childSnapshots = undefined;
    }
  }
};

Cosmos.mixins.Url = {
  /**
   * Enables basic linking between Components, with optional use of the minimal
   * built-in Router.
   */
  getUrlFromProps: function(props) {
    /**
     * Serializes a props object into a browser-complient URL. The URL
     * generated can be simply put inside the href attribute of an <a> tag, and
     * can be combined with the serialize method of the ComponentTree Mixin to
     * create a link that opens the current Component at root level
     * (full window.)
     */
    return '?' + Cosmos.serialize.getQueryStringFromProps(props);
  },

  routeLink: function(event) {
    /**
     * Any <a> tag can have this method bound to its onClick event to have
     * their corresponding href location picked up by the built-in Router
     * implementation, which uses pushState to switch between Components
     * instead of reloading pages.
     */
    event.preventDefault();
    this.props.router.goTo(event.currentTarget.href);
  }
};

var classSet = React.addons.classSet;

Cosmos.components.ComponentPlayground = React.createClass({
  /**
   * The Component Playground provides a minimal frame for loading React
   * components in isolation. It can either render the component full-screen or
   * with the navigation pane on the side.
   */
  mixins: [Cosmos.mixins.ComponentTree,
           Cosmos.mixins.Url],

  displayName: 'ComponentPlayground',

  propTypes: {
    fixtures: React.PropTypes.object.isRequired,
    fixturePath: React.PropTypes.string,
    fullScreen: React.PropTypes.bool,
    containerClassName: React.PropTypes.string
  },

  getInitialState: function() {
    var expandedComponents = [];

    // Expand the relevant component when a fixture is selected
    if (this.props.fixturePath) {
      expandedComponents.push(
        this._getComponentNameFromPath(this.props.fixturePath));
    }

    return {
      expandedComponents: expandedComponents
    };
  },

  children: {
    preview: function() {
      var fixturePath = this.props.fixturePath;

      var props = {
        component: this._getComponentNameFromPath(fixturePath),
        key: fixturePath
      };

      if (this.props.router) {
        props.router = this.props.router;
      }

      var fixture = this._getFixtureContentsFromPath(fixturePath);
      return _.merge(props, fixture);
    }
  },

  render: function() {
    var classes = classSet({
      'component-playground': true,
      'full-screen': this.props.fullScreen
    });

    return (
      React.createElement("div", {className: classes}, 
        React.createElement("div", {className: "header"}, 
          this.renderFullScreenButton(), 
          React.createElement("h1", null, 
            React.createElement("a", {href: "?", 
               className: "home-link", 
               onClick: this.routeLink}, 
              React.createElement("span", {className: "react"}, "React"), " Component Playground"
            ), 
            React.createElement("span", {className: "cosmos-plug"}, 
              "powered by ", 
              React.createElement("a", {href: "https://github.com/skidding/cosmos"}, "Cosmos")
            )
          )
        ), 
        React.createElement("div", {className: "fixtures"}, 
          this.renderFixtures()
        ), 
        React.createElement("div", {ref: "preview", className: this._getPreviewClasses()}, 
          this.props.fixturePath ? this.loadChild('preview') : null
        )
      )
    );
  },

  renderFixtures: function() {
    return React.createElement("ul", {className: "components"}, 
      _.map(this.props.fixtures, function(fixtures, componentName) {

        var classes = classSet({
          'component': true,
          'expanded':
            this.state.expandedComponents.indexOf(componentName) !== -1
        });

        return React.createElement("li", {className: classes, key: componentName}, 
          React.createElement("p", {className: "component-name"}, 
            React.createElement("a", {href: "#toggle-component", 
               onClick: _.partial(this.handleComponentClick, componentName), 
               ref: componentName + "Button"}, 
              componentName
            )
          ), 
          this.renderComponentFixtures(componentName, fixtures)
        );

      }.bind(this))
    )
  },

  renderComponentFixtures: function(componentName, fixtures) {
    return React.createElement("ul", {className: "component-fixtures"}, 
      _.map(fixtures, function(props, fixtureName) {

        var url = this.getUrlFromProps({
          fixturePath: componentName + '/' + fixtureName
        });

        return React.createElement("li", {className: this._getFixtureClasses(fixtureName), 
                   key: fixtureName}, 
          React.createElement("a", {href: url, onClick: this.routeLink}, 
            fixtureName.replace(/-/g, ' ')
          )
        );

      }.bind(this))
    );
  },

  renderFullScreenButton: function() {
    if (!this.props.fixturePath) {
      return;
    }

    var fullScreenUrl = this.getUrlFromProps({
      fixturePath: this.props.fixturePath,
      fullScreen: true
    });

    return React.createElement("a", {href: fullScreenUrl, 
              className: "full-screen-button", 
              ref: "fullScreenButton"}, "Fullscreen");
  },

  handleComponentClick: function(componentName, event) {
    event.preventDefault();

    var currentlyExpanded = this.state.expandedComponents,
        componentIndex = currentlyExpanded.indexOf(componentName),
        toBeExpanded;

    if (componentIndex !== -1) {
      toBeExpanded = _.clone(currentlyExpanded);
      toBeExpanded.splice(componentIndex, 1);
    } else {
      toBeExpanded = currentlyExpanded.concat(componentName);
    }

    this.setState({expandedComponents: toBeExpanded});
  },

  _getPreviewClasses: function() {
    var classes = {
      'preview': true
    };

    if (this.props.containerClassName) {
      classes[this.props.containerClassName] = true;
    }

    return classSet(classes);
  },

  _getFixtureClasses: function(fixtureName) {
    var classes = {
      'component-fixture': true
    };

    var fixturePath = this.props.fixturePath;
    if (fixturePath) {
      var selectedFixtureName = this._getFixtureNameFromPath(fixturePath);
      classes['selected'] = fixtureName === selectedFixtureName;
    }

    return classSet(classes);
  },

  _getFixtureContentsFromPath: function(fixturePath) {
    var componentName = this._getComponentNameFromPath(fixturePath),
        fixtureName = this._getFixtureNameFromPath(fixturePath);

    return this.props.fixtures[componentName][fixtureName];
  },

  _getComponentNameFromPath: function(fixturePath) {
    return fixturePath.split('/')[0];
  },

  _getFixtureNameFromPath: function(fixturePath) {
    return fixturePath.substr(fixturePath.indexOf('/') + 1);
  }
});

return Cosmos;
}));
