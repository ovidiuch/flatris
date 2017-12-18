import Button from '../../Button';

export default {
  component: Button,
  children: 'Press me will you',
  props: {
    disabled: true,
    bgColor: '#fff',
    color: '#34495f',
    colorDisabled: 'rgba(52, 73, 95, 0.6)',
    onClick: () => console.log('Yay! Button clicked-ed!')
  }
};
