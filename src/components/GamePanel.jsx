var React = require('react'),
    ComponentTree = require('react-component-tree'),
    constants = require('../constants.js'),
    events = require('../lib/events.js'),
    Tetrimino = require('./Tetrimino.jsx');

require('../style/GamePanel.less');

class GamePanel extends ComponentTree.Component {
  /**
   * The game panel contains:
   * - The next Tetrimino to be inserted
   * - The score and lines cleared
   * - Start or pause/resume controls
   */
  constructor() {
    super();

    this.children = {
      nextTetrimino: function() {
        var tetrimino = this.props.nextTetrimino;

        return {
          component: Tetrimino,
          key: tetrimino,
          color: constants.COLORS[tetrimino]
        };
      }
    };
  }

  render() {
    return <div className="game-panel">
      <p className="title">Flatris</p>
      <p className="label">Score</p>
      <p className="count">{this.props.score}</p>
      <p className="label">Lines Cleared</p>
      <p className="count">{this.props.lines}</p>
      <p className="label">Next Shape</p>
      <div className={this._getNextTetriminoClass()}>
        {this.props.nextTetrimino ? this.loadChild('nextTetrimino') : null}
      </div>
      {this._renderGameButton()}
    </div>;
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.nextTetrimino &&
        this.props.nextTetrimino != prevProps.nextTetrimino) {
      this.refs.nextTetrimino.setState({
        grid: constants.SHAPES[this.props.nextTetrimino]
      });
    }
  }

  _renderGameButton() {
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

    return React.DOM.button(events.attachPointerDownEvent(eventHandler), label);
  }

  _getNextTetriminoClass() {
    var classes = ['next-tetrimino'];
    // We use this extra class to position tetriminos differently from CSS
    // based on their type
    if (this.props.nextTetrimino) {
      classes.push('next-tetrimino-' + this.props.nextTetrimino);
    }
    return classes.join(' ');
  }
}

GamePanel.defaultProps = {
  playing: false,
  paused: false,
  score: 0,
  lines: 0,
  nextTetrimino: null
};

module.exports = GamePanel;
