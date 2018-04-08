// @flow

import { createFixture } from 'react-cosmos-flow/fixture';
import Error from '../../Error';

export default createFixture({
  component: Error,

  props: {
    statusCode: 404
  }
});
