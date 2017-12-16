import { STOPPED } from '../../../constants/states';
import GamePanel from '../../GamePanel';

export default {
  component: GamePanel,

  props: {
    gameState: STOPPED,
    score: 0,
    lines: 0,
    nextTetromino: null,
    onStart: () => console.log('Start'),
    onPause: () => console.log('Pause'),
    onResume: () => console.log('Resume')
  }
};
