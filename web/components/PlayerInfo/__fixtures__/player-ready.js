// @flow

import React from 'react';
import { getBlankPlayer } from 'shared/reducers/game';
import PlayerInfo from '..';

const user = { id: 'mock', name: 'Treznik' };
const player = {
  ...getBlankPlayer('mock', user),
  status: 'READY',
  score: 1337,
  lines: 30
};

export default (
  <PlayerInfo player={player} wins={3} isPlayer1={true} showReadyState={true} />
);
