// @flow

import Button from '../../Button';

export default {
  component: Button,
  children: 'Press me will you',
  props: {
    bgColor: '#fff',
    color: '#34495f',
    onClick: () => console.log('Yay! Button clicked-ed!')
  }
};
