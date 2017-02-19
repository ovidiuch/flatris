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
      Flatris is demo app for the{' '}
      <a href="https://github.com/react-cosmos/react-cosmos">React Cosmos</a>
      {' '}project.
    </p>
    <p>
      Inspired by the classic{' '}
      <a href="http://en.wikipedia.org/wiki/Tetris">Tetris</a>
      {' '}
      game, the game can be played both with a keyboard using the arrow keys, and on mobile devices using the buttons below.
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
