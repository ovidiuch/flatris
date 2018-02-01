// @flow

import Button from '../../Button';

import type { Props } from '../../Button';

const fixture: { props: Props } = {
  component: Button,
  props: {
    children: 'Press or be pressed',
    onClick: () => console.log('Yay! Button clicked-ed!')
  }
};

export default fixture;

