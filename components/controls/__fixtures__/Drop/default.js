// @flow

import Drop from '../../Drop';

export default {
  component: Drop,
  props: {
    onPress: () => console.log('Pressing...'),
    onRelease: () => console.log('...and releasing!')
  }
};
