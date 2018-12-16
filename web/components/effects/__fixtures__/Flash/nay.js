// @flow

import { createFixture } from 'react-cosmos';
import { getSampleUser } from '../../../../utils/test-helpers';
import { getBlankPlayer } from 'shared/reducers/game';
import Flash from '../../../effects/Flash';

const user = getSampleUser();
const player = {
  ...getBlankPlayer('dce6b11e', user),
  flashNay: 'a'
};

export default createFixture({
  component: Flash,
  props: {
    player,
    children: `D'oh!`
  }
});
