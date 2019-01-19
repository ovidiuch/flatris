// @flow

import { createFixture } from 'react-cosmos';
import Button from '../../Button';

export default createFixture({
  component: Button,
  props: {
    children: 'Press me will you',
    bgColor: '#fff',
    color: '#34495f',
    onClick: () => console.log('Yay! Button clicked-ed!')
  }
});
