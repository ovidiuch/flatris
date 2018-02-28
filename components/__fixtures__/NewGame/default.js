// @flow

import NewGame from '../../NewGame';

// NOTE: A authenticated fixture for NewGame does not exist because it would
// automatically redirect to /join page
export default {
  component: NewGame,

  reduxState: {
    jsReady: true
  }
};
