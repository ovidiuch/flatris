// @flow

import InviteOrPlaySolo from '../../InviteOrPlaySolo';

export default {
  component: InviteOrPlaySolo,
  props: {
    onPlay: () => console.log(`Play!`)
  },
  container: {
    width: 10,
    height: 20
  }
};
