// @flow

import { createFixture } from 'react-cosmos-classic';
import Error from '../../Error';

export default createFixture({
  component: Error,

  props: {
    statusCode: 404
  }
});
