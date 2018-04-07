// @flow

import { createFixture } from 'react-cosmos-flow/fixture';
import CopyGameLinkButton from '../../CopyGameLinkButton';

export default createFixture({
  component: CopyGameLinkButton,

  props: {
    disabled: false,
    gameId: '1337'
  }
});
