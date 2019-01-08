// @flow

import React from 'react';
import GameContainer from '../components/GameContainer';

const MAX_COLS = 16;
const MAX_ROWS = 20;

export function GameContainerMock({
  children,
  cols = MAX_COLS,
  rows = MAX_ROWS
}: {
  children: React$Node,
  cols?: number,
  rows?: number
}) {
  return (
    <GameContainer>
      <div className="inner-container">{children}</div>
      <style jsx>{`
        .inner-container {
          position: absolute;
          width: calc(100% / ${MAX_COLS} * ${cols});
          height: calc(100% / ${MAX_ROWS} * ${rows});
        }
      `}</style>
    </GameContainer>
  );
}
