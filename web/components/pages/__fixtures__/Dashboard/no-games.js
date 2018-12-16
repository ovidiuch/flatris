// @flow

import { createFixture } from 'react-cosmos';
import Dashboard from '../../Dashboard';

export default createFixture({
  component: Dashboard,

  reduxState: {
    jsReady: true
  }
});
