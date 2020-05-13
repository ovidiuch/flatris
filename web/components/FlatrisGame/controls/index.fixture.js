// @flow

import React from 'react';
import Drop from './Drop';
import Left from './Left';
import Right from './Right';
import Rotate from './Rotate';

export default {
  left: <Left onPress={() => console.log('onPres')} />,
  right: <Right onPress={() => console.log('onPres')} />,
  rotate: <Rotate onPress={() => console.log('onPres')} />,
  drop: <Drop onPress={() => console.log('onPres')} />
};
