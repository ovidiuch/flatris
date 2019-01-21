// @flow

import React from 'react';
import { getBlankPlayer } from 'shared/reducers/game';
import PlayerInfo from '..';

const user = { id: 'mock', name: 'Lorem ipsum' };
const player = {
  ...getBlankPlayer('mock', user),
  score: 355,
  lines: 5
};

export default (
  <PlayerInfo
    player={player}
    wins={null}
    isPlayer1={true}
    showReadyState={false}
  />
);
