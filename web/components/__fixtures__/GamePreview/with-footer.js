// @flow

import { getSampleUser } from '../../../utils/test-helpers';
import { getBlankGame } from 'shared/reducers/game';
import GamePreview from '../../GamePreview';

const user = getSampleUser();
const game = getBlankGame({ id: 'dce6b11e', user });

export default {
  component: GamePreview,

  props: {
    curUser: user,
    game: game,
    onSelectP2: () => console.log('Select P2'),
    showFooter: true
  },

  container: {}
};
