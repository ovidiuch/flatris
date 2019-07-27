// @flow

import React from 'react';
import Flash from './Flash';
import { getBlankPlayer } from 'shared/reducers/game';
import { getSampleUser } from '../../utils/test-helpers';

const user = getSampleUser();
const player = getBlankPlayer('dce6b11e', user);

export default {
  yay: <Flash player={{ ...player, flashYay: 'a' }}>Yas!</Flash>,

  nay: <Flash player={{ ...player, flashNay: 'a' }}>D'oh!</Flash>
};
