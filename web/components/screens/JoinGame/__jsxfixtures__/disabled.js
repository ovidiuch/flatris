// @flow

import React from 'react';
import JoinGame from '..';

export default (
  <JoinGame
    disabled={true}
    onWatch={() => console.log('Just watch')}
    onJoin={() => console.log('Join game')}
  />
);
