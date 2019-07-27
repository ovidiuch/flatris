// @flow

import React from 'react';
import Invite from '.';

export default {
  default: (
    <Invite disabled={false} gameId="1337" onPlay={() => console.log('Play')} />
  ),

  disabled: (
    <Invite disabled={true} gameId="1337" onPlay={() => console.log('Play')} />
  )
};
