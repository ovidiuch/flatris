import Button from '../../Button';

export default {
  component: Button,
  children: 'No chance amigo',
  props: {
    disabled: true,
    onClick: () => console.log('Yay! Button clicked-ed!')
  }
};
