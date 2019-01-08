// @flow

import React from 'react';
import Button from '..';

export default (
  <Button
    children="Press me will you"
    bgColor="#fff"
    color="#34495f"
    colorDisabled="rgba(52, 73, 95, 0.6)"
    onClick={() => console.log('Yay! Button clicked-ed!')}
  />
);
