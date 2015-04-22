var constants = require('../../src/constants.js');

module.exports = {
  state: {
    playing: true,
    paused: false,
    nextTetrimino: 'I',

    children: {
      well: {
        activeTetrimino: 'J',
        activeTetriminoPosition: {x: 4, y: -2},
        animationLoopRunning: true,

        children: {
          activeTetrimino: {
            grid: constants.SHAPES.J
          }
        }
      }
    }
  }
};
