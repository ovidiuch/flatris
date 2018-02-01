// @flow

import Button from '../../Button';

import type { Props } from '../../Button';

const fixture: { props: Props } = {
  component: Button,
  props: {
    children: 'Press me will you',
    bgColor: '#fff',
    color: '#34495f',
    onClick: () => console.log('Yay! Button clicked-ed!')
  }
};

export default fixture;

