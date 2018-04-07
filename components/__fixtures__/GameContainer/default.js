// @flow

import { createFixture } from 'react-cosmos-flow/fixture';
import GameContainer from '../../GameContainer';

export default createFixture({
  component: GameContainer,
  props: {
    children: 'Hello'
  }
});
