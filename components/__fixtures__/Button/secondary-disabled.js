// @flow

import Button from '../../Button';

import type { Props } from '../../Button';

const fixture: { props: Props } = {
  component: Button,
  props: {
    children: 'Press me will you',
    disabled: true,
    bgColor: '#fff',
    color: '#34495f',
    colorDisabled: 'rgba(52, 73, 95, 0.6)',
    onClick: () => console.log('Yay! Button clicked-ed!')
  }
};

export default fixture;

