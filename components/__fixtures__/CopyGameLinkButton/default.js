// @flow

import { createFixture } from '../../../utils/create-fixture';
import CopyGameLinkButton from '../../CopyGameLinkButton';

export default createFixture({
  component: CopyGameLinkButton,

  props: {
    disabled: false,
    gameId: '1337'
  }
});
