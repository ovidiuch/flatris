// @flow

import React from 'react';
import { createFixture } from 'react-cosmos-classic';
import FadeIn from '../../../effects/FadeIn';

export default createFixture({
  component: FadeIn,
  props: {
    children: <div>Nice and smooth</div>
  }
});
