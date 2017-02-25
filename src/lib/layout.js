const getWindowSize = () => ({
  // body.clientWidth seems to not include the scrollbar width, but we fallback
  // window.innerWidth in environments where body isn't available (e.g jsdom)
  width: document.body.clientWidth || window.innerWidth,
  height: window.innerHeight
});

const ACTION_ID = '@@layout/RESIZE';

let _store;
let _computeLayout;

// Didn't named the export as just "reducer" because the user will probably
// already have a "reducer" import or variable name in the consuming namespace
export const layoutReducer = (state, action) => {
  // Ignore Redux init. Layout needs state instance to init, so it's impossible
  // to register the computeLayout fn before the Redux store init.
  if (typeof _computeLayout !== 'function') {
    return {};
  }

  if (action.type === ACTION_ID) {
    return _computeLayout(getWindowSize());
  }

  return state;
};

const handleResize = () => {
  _store.dispatch({
    type: ACTION_ID
  });
};

export default ({ store, computeLayout }) => {
  _store = store;
  _computeLayout = computeLayout;
  window.addEventListener('resize', handleResize);

  // Init layout data
  handleResize();

  return () => {
    _store = _computeLayout = undefined;
    window.removeEventListener('resize', handleResize);
  };
};
