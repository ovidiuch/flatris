// @flow

import React from 'react';

const MAX_COLS = 16;
const MAX_ROWS = 20;

type Props = {
  children: React$Node,
  cols?: number,
  rows?: number,
  backgroundColor?: string
};

export function GameContainerMock({
  children,
  cols = MAX_COLS,
  rows = MAX_ROWS,
  backgroundColor = '#fff'
}: Props) {
  return (
    <div className="container">
      {children}
      <style jsx>{`
        .container {
          position: relative;
          width: ${cols * 32}px;
          height: ${rows * 32}px;
          font-size: 19px;
          background-color: ${backgroundColor};
        }
      `}</style>
    </div>
  );
}
