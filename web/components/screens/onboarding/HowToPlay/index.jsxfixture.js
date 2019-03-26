// @flow

import React from 'react';
import HowToPlay from '.';

export default {
  enabled: <HowToPlay disabled={false} onNext={() => console.log('Next')} />,

  disabled: <HowToPlay disabled onNext={() => console.log('Next')} />
};
