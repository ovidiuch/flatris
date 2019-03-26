// @flow

import React from 'react';
import { StateMock } from '@react-mock/state';
import { getBlankPlayer } from 'shared/reducers/game';
import { getSampleUser } from '../../../utils/test-helpers';
import WaitingForOther from '.';

const user = getSampleUser();
const curPlayer = getBlankPlayer('1337', user);

export default {
  default: (
    <WaitingForOther
      disabled={false}
      curPlayer={curPlayer}
      onPing={() => console.log(`Ping!`)}
    />
  ),

  disabled: (
    <WaitingForOther
      disabled={true}
      curPlayer={curPlayer}
      onPing={() => console.log(`Ping!`)}
    />
  ),

  'other player idle': (
    <StateMock state={{ isOtherPlayerIdle: true }}>
      <WaitingForOther
        disabled={false}
        curPlayer={curPlayer}
        onPing={() => console.log(`Ping!`)}
      />
    </StateMock>
  ),

  ping: (
    <WaitingForOther
      disabled={false}
      curPlayer={{ ...curPlayer, ping: 1234 }}
      onPing={() => console.log(`Ping!`)}
    />
  )
};
