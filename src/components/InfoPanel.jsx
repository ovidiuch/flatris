var React = require('react'),
    ComponentTree = require('react-component-tree');

require('../style/components/InfoPanel.less');

class InfoPanel extends ComponentTree.Component {
  /**
   * Information panel for the Flatris game/Cosmos demo, shown in between game
   * states.
   */
  render() {
    // jscs:disable maximumLineLength
    return <div className="info-panel">
      <p className="large-text">Flatris is demo app for the <a href="https://github.com/skidding/cosmos">Cosmos</a> JavaScript user interface framework, built using <a href="https://github.com/facebook/react">React</a> components.</p>
      <p>Inspired by the classic <a href="http://en.wikipedia.org/wiki/Tetris">Tetris</a> game, the game can be played both with a keyboard using the arrow keys, and on mobile devices using the buttons below.</p>
      <p>Because Cosmos can serialize the entire state of an application at any given time, Flatris stores your game state into the browser local storage when you close the tab and resumes playing whenever you return. Try a hard-refresh in the middle of a game.</p>
      <p className="large-text">The project source has ~1k lines of JS code and is open source on <a href="https://github.com/skidding/flatris">GitHub.</a></p>
    </div>;
    // jscs:enable maximumLineLength
  }
}

module.exports = InfoPanel;
