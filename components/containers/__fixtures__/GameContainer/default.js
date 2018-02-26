import { createFixture } from '../../../../utils/create-fixture';
import GameContainer from '../../GameContainer';

export default createFixture({
  component: GameContainer,
  props: {
    children: 'Hello'
  }
});
