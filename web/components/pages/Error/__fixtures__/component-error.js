// @flow

import React from 'react';
import Error from '..';

export default (
  <Error
    error={{
      message: `ReferenceError: xxx is not defined`,
      stack: `
  in NewGame (created by Connect(NewGame))
  in Connect(NewGame) (at new.js?entry:25)
  in SocketProvider (at new.js?entry:24)
  in div (at Layout.js:118)
  in div (at Layout.js:62)
  in Layout (created by Connect(Layout))
  in Connect(Layout) (at new.js?entry:23)
  in CreatePage (created by Connect(CreatePage))
  in Connect(CreatePage) (created by WrappedCmp)
  in Provider (created by WrappedCmp)
  in WrappedCmp (created by Container)
  in AppContainer (created by Container)
  in Container (created by App)
  in App`
    }}
  />
);
