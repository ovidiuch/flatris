// @flow

import React from 'react';
import CopyGameLinkButton from './CopyGameLinkButton';

export default {
  default: <CopyGameLinkButton disabled={false} gameId="1337" />,
  disabled: <CopyGameLinkButton disabled={true} gameId="1337" />
};
