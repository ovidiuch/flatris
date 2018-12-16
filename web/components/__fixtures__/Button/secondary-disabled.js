// @flow

import { createFixture } from 'react-cosmos';
import Button from '../../Button';

export default createFixture({
  component: Button,
  props: {
    children: 'Press me will you',
    disabled: true,
    bgColor: '#fff',
    color: '#34495f',
    colorDisabled: 'rgba(52, 73, 95, 0.6)',
    onClick: () => console.log('Yay! Button clicked-ed!')
  }
});
