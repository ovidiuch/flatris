// @flow

import PointerButton from '../../PointerButton';

export default {
  component: PointerButton,
  children: 'Try me',
  props: {
    onPress: () => console.log('Pressing...'),
    onRelease: () => console.log('...and releasing!')
  }
};
