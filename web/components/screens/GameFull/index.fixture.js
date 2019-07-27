// @flow

import React from 'react';
import GameFull from '.';

export default {
  default: (
    <GameFull disabled={false} onWatch={() => console.log('Just watch')} />
  ),

  disabled: (
    <GameFull disabled={true} onWatch={() => console.log('Just watch')} />
  )
};
