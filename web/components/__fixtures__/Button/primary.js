// @flow

import { createFixture } from 'react-cosmos';
import Button from '../../Button';

export default createFixture({
  component: Button,
  props: {
    children: 'Press or be pressed',
    onClick: () => console.log('Yay! Button clicked-ed!')
  }
});
