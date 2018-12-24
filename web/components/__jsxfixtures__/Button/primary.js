// @flow

import React from 'react';
import Button from '../../Button';

export default (
  <Button
    children="Press or be pressed"
    onClick={() => console.log('Yay! Button clicked-ed!')}
  />
);
