// @flow

import { createFixture } from '../../../utils/create-fixture';
import CopyLink from '../../CopyLink';

export default createFixture({
  component: CopyLink,

  props: {
    disabled: true,
    gameId: '1337'
  }
});
