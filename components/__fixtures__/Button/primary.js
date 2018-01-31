// @flow

import Button from '../../Button';

export default {
  component: Button,
  children: 'Press or be pressed',
  props: {
    onClick: () => console.log('Yay! Button clicked-ed!')
  }
};
