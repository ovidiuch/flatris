// @flow

import React from 'react';
import NewGame from '.';

export default {
  default: (
    <NewGame
      disabled={false}
      gameId="1337"
      onPlay={() => console.log('Play!')}
    />
  ),

  disabled: (
    <NewGame disabled gameId="1337" onPlay={() => console.log('Play!')} />
  )
};
