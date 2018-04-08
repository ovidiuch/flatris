// @flow

import { createFixture } from 'react-cosmos-flow/fixture';
import Dashboard from '../../Dashboard';

export default createFixture({
  component: Dashboard,

  reduxState: {
    jsReady: true
  }
});
