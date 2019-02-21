// @flow

import React from 'react';
import { StateMock } from '@react-mock/state';
import CopyButton from '.';

export default {
  default: (
    <CopyButton
      disabled={false}
      copyText="I made you copy me!"
      defaultLabel="Copy link"
      successLabel="Link copied!"
      errorLabel="Copy failed :("
    />
  ),

  disabled: (
    <CopyButton
      disabled={true}
      copyText="I made you copy me!"
      defaultLabel="Copy link"
      successLabel="Link copied!"
      errorLabel="Copy failed :("
    />
  ),

  'copy success': (
    <StateMock state={{ copyStatus: 'success' }}>
      <CopyButton
        disabled={false}
        copyText="I made you copy me!"
        defaultLabel="Copy link"
        successLabel="Link copied!"
        errorLabel="Copy failed :("
      />
    </StateMock>
  ),

  'copy error': (
    <StateMock state={{ copyStatus: 'error' }}>
      <CopyButton
        disabled={false}
        copyText="I made you copy me!"
        defaultLabel="Copy link"
        successLabel="Link copied!"
        errorLabel="Copy failed :("
      />
    </StateMock>
  )
};
