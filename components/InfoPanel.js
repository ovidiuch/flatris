import React from 'react';

/**
 * Information panel for the Flatris game/Cosmos demo, shown in between game
 * states.
 */
const InfoPanel = () => (
  <div className="info-panel">
    <p>Hello</p>
    <style jsx>{`
      .info-panel {
        position: absolute;
        top: 0;
        bottom: 0;
        left: calc(100% * 1 / 10);
        right: calc(100% * 1 / 10);
        color: #34495f;
        font-size: 1.1em;
      }
    `}</style>
  </div>
);

export default InfoPanel;
