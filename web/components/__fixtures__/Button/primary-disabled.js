// @flow

import { createFixture } from 'react-cosmos';
import Button from '../../Button';

export default createFixture({
  component: Button,
  props: {
    children: 'No chance amigo',
    disabled: true,
    onClick: () => console.log('Yay! Button clicked-ed!')
  }
});
