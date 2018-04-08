// @flow

import { createFixture } from 'react-cosmos-flow/fixture';
import Button from '../../Button';

export default createFixture({
  component: Button,
  props: {
    children: 'Press or be pressed',
    onClick: () => console.log('Yay! Button clicked-ed!')
  }
});
