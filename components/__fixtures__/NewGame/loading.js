// @flow

import { createFixture } from '../../../utils/create-fixture';
import NewGame from '../../NewGame';

// NOTE: A authenticated fixture for NewGame does not exist because it would
// automatically redirect to /join page
export default createFixture({
  component: NewGame,

  reduxState: {
    jsReady: false
  }
});
