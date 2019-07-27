// @flow

import React from 'react';
import { getSampleUser } from '../../../utils/test-helpers';
import { getBlankPlayer } from 'shared/reducers/game';
import GetReady from '.';

const user = getSampleUser();
const otherPlayer = getBlankPlayer('1337', user);

export default {
  default: (
    <GetReady
      disabled={false}
      otherPlayer={otherPlayer}
      onReady={() => console.log('Ready!')}
    />
  ),

  disabled: (
    <GetReady
      disabled
      otherPlayer={otherPlayer}
      onReady={() => console.log('Ready!')}
    />
  ),

  ping: (
    <GetReady
      disabled={false}
      otherPlayer={{ ...otherPlayer, ping: 1234 }}
      onReady={() => console.log('Ready!')}
    />
  )
};
