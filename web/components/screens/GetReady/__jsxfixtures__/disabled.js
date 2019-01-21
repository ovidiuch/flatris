// @flow

import React from 'react';
import { getSampleUser } from '../../../../utils/test-helpers';
import { getBlankPlayer } from 'shared/reducers/game';
import GetReady from '..';

const user = getSampleUser();
const otherPlayer = getBlankPlayer('1337', user);

export default (
  <GetReady
    disabled
    otherPlayer={otherPlayer}
    onReady={() => console.log('Ready!')}
  />
);
