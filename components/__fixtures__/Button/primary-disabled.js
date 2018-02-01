// @flow

import Button from '../../Button';

import type { Props } from '../../Button';

const fixture: { props: Props } = {
  component: Button,
  props: {
    children: 'No chance amigo',
    disabled: true,
    onClick: () => console.log('Yay! Button clicked-ed!')
  }
};

export default fixture;
