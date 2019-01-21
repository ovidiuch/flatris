// @flow

import React from 'react';
import { getBlankPlayer } from 'shared/reducers/game';
import PlayerInfo from '..';

const user = { id: 'mock', name: 'Treznik' };
const player = {
  ...getBlankPlayer('mock', user),
  score: 442387,
  lines: 226
};

export default (
  <PlayerInfo
    player={player}
    wins={null}
    isPlayer1={true}
    showReadyState={false}
  />
);
