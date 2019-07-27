// @flow

import React from 'react';
import JoinGame from '.';

export default {
  default: (
    <JoinGame
      disabled={false}
      onWatch={() => console.log('Just watch')}
      onJoin={() => console.log('Join game')}
    />
  ),

  disabled: (
    <JoinGame
      disabled={true}
      onWatch={() => console.log('Just watch')}
      onJoin={() => console.log('Join game')}
    />
  )
};
