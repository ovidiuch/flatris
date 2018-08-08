// @flow

import { createFixture } from 'react-cosmos';
import CopyGameLinkButton from '../../CopyGameLinkButton';

export default createFixture({
  component: CopyGameLinkButton,

  props: {
    disabled: true,
    gameId: '1337'
  }
});
