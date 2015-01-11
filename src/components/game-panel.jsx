/** @jsx React.DOM */

Cosmos.components.GamePanel = React.createClass({
  /**
   * The game panel contains
   * - the next Tetrimono to be inserted
   * - the score and lines cleared
   * - start or pause/resume controls
   */
  mixins: [Cosmos.mixins.PersistState],

  getDefaultProps: function() {
    return {
      playing: false,
      paused: false,
      score: 0,
      lines: 0,
      nextTetrimino: null
    };
  },

  children: {
    nextTetrimino: function(tetrimino) {
      return {
        component: 'Tetrimino',
        color: Flatris.COLORS[tetrimino],
        state: {
          grid: Flatris.SHAPES[tetrimino]
        }
      };
    }
  },

  render: function() {
    return (
      <div className="game-panel">
        <p className="title">Flatris</p>
        <p className="label">Score</p>
        <p className="count">{this.props.score}</p>
        <p className="label">Lines Cleared</p>
        <p className="count">{this.props.lines}</p>
        <p className="label">Next Shape</p>
        <div className={this.getNextTetriminoClass()}>
          {this.renderNextTetrimino()}
        </div>
        {this.renderGameButton()}
      </div>
    );
  },

  renderNextTetrimino: function() {
    var nextTetrimino = this.props.nextTetrimino;
    if (!nextTetrimino) {
      return;
    }
    return this.loadChild('nextTetrimino', nextTetrimino);
  },

  renderGameButton: function() {
    var eventHandler,
        label;
    if (!this.props.playing) {
      eventHandler = this.props.onPressStart;
      label = 'New game';
    } else if (this.props.paused) {
      eventHandler = this.props.onPressResume;
      label = 'Resume';
    } else {
      eventHandler = this.props.onPressPause;
      label = 'Pause';
    }
    return React.DOM.button(Flatris.attachPointerDownEvent(eventHandler), label);
  },
  
  getNextTetriminoClass: function() {
    var classes = ['next-tetrimino'];
    // We use this extra class to position tetriminos differently from CSS
    // based on their type
    if (this.props.nextTetrimino) {
      classes.push('next-tetrimino-' + this.props.nextTetrimino);
    }
    return classes.join(' ');
  }
});
