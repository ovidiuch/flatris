import React from 'react';
import connectLayout from '../lib/layout-connect';

import './InfoPanel.css';

/**
 * Information panel for the Flatris game/Cosmos demo, shown in between game
 * states.
 */
const InfoPanel = ({ styles }) => (
  <div className="info-panel" style={styles.root}>
    <p>
      <a href="https://github.com/skidding/flatris">Flatris</a>
      {' '}
      is a mobile-friendly implementation of Tetris, built using React & Redux.
    </p>
    <p>
      Use the arrow keys or buttons below to play.
    </p>
    <p>
      The game state is preserved between visits, so you can safely kill this tab when your employer is approaching and resume afterwards–including
      {' '}
      <a href="http://caniuse.com/#feat=serviceworkers">offline</a>
      !
    </p>
    <p>
      Check out the{' '}
      <a href="https://github.com/skidding/flatris">source code</a>
      {' '}when you're done playing.
    </p>
    <p>
      Built by <a href="https://twitter.com/skidding">@skidding</a>.
    </p>
  </div>
);

export default connectLayout(InfoPanel, {
  getStyles: ({ fontSize }) => ({
    root: {
      fontSize: fontSize.text
    }
  })
});
