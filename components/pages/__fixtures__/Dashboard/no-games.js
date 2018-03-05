// @flow

import { createFixture } from '../../../../utils/create-fixture';
import Dashboard from '../../Dashboard';

export default createFixture({
  component: Dashboard,

  reduxState: {
    jsReady: true
  }
});
