// @flow

import { createFixture } from '../../../../utils/create-fixture';
import Error from '../../Error';

export default createFixture({
  component: Error,

  props: {
    statusCode: null,
    errorText: 'undefined is not a function'
  }
});
