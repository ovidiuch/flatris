// @flow

import React from 'react';
import { createFixture } from '../../../../utils/create-fixture';
import FadeIn from '../../../effects/FadeIn';

export default createFixture({
  component: FadeIn,
  props: {
    children: <div>Nice and smooth</div>
  }
});
