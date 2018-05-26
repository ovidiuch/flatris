// @flow

import { createFixture } from '../../../utils/create-fixture';
import CopyButton from '../../CopyButton';

export default createFixture({
  component: CopyButton,

  props: {
    disabled: true,
    copyText: 'I made you copy me!',
    defaultLabel: 'Copy link',
    successLabel: 'Link copied!',
    errorLabel: 'Copy failed :('
  }
});
