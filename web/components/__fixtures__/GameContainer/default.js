// @flow

import { createFixture } from 'react-cosmos';
import GameContainer from '../../GameContainer';

export default createFixture({
  component: GameContainer,
  props: {
    children: 'Hello'
  }
});
