// @flow

import { getSampleUser } from '../../../../utils/test-helpers';
import { getBlankPlayer } from '../../../../reducers/game';
import Flash from '../../../effects/Flash';

const user = getSampleUser();
const player = {
  ...getBlankPlayer(1337, user),
  flashYay: 'a'
};

const fixture = {
  component: Flash,
  props: {
    player
  },
  children: `D'oh!`
};

export default fixture;
