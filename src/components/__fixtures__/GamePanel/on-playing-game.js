import { PLAYING } from '../../../constants/states';

export default {
  gameState: PLAYING,
  score: 10,
  lines: 0,
  nextTetromino: 'S',
  onStart: () => console.log('Start'),
  onPause: () => console.log('Pause'),
  onResume: () => console.log('Resume')
};
