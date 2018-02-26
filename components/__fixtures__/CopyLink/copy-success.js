// @flow

import { createFixture } from '../../../utils/create-fixture';
import CopyLink from '../../CopyLink';

export default createFixture({
  component: CopyLink,

  props: {
    disabled: false,
    gameId: '1337'
  },

  state: {
    copyStatus: 'success'
  }
});
