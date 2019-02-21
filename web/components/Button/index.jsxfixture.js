// @flow

import React from 'react';
import Button from '.';

export default {
  primary: (
    <Button
      children="Press or be pressed"
      onClick={() => console.log('Yay! Button clicked-ed!')}
    />
  ),

  'primary disabled': <Button children="No chance amigo" disabled />,

  secondary: (
    <Button
      children="Press me will you"
      bgColor="#fff"
      color="#34495f"
      colorDisabled="rgba(52, 73, 95, 0.6)"
      onClick={() => console.log('Yay! Button clicked-ed!')}
    />
  ),

  'secondary disabled': (
    <Button
      children="Press me will you"
      disabled
      bgColor="#fff"
      color="#34495f"
      colorDisabled="rgba(52, 73, 95, 0.6)"
    />
  )
};
