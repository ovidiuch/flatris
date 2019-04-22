// @flow

import { createFixture } from 'react-cosmos-classic';
import Dashboard from '../../Dashboard';

export default createFixture({
  component: Dashboard,

  reduxState: {
    jsReady: true
  }
});
