/** @jsx React.DOM */

Cosmos.components.InfoPanel = React.createClass({
  /**
   * Information panel for the Flatris game/Cosmos demo, shown in between game
   * states.
   */
  render: function() {
    return (
      <div className="info-panel">
        <p className="headline"><em>Flatris</em> is demo app for the <a href="https://github.com/skidding/cosmos">Cosmos</a> JavaScript user interface framework, built using <a href="https://github.com/facebook/react">React</a> components.</p>
        <p>Inspired by the classic <a href="http://en.wikipedia.org/wiki/Tetris">Tetris</a> game, the game can be played both with a keyboard using the arrow keys, and on mobile devices using the buttons below.</p>
        <p>Because Cosmos can serialize the entire state of an application at any given time, Flatris stores your game state into the browser local storage when you close the tab and resumes playing whenever you return. Try a hard-refresh in the middle of a game.</p>
        <p>The project source has under 1k lines of JS code and is open source on <a href="https://github.com/skidding/flatris">GitHub.</a></p>
      </div>
    );
  }
});
