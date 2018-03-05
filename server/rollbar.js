// @flow

var Rollbar = require('rollbar');

export const rollbar = new Rollbar({
  accessToken: process.env.ROLLBAR_POST_SERVER_ITEM_ACCESS_TOKEN,
  captureUncaught: true,
  captureUnhandledRejections: true,
  verbose: true,
  reportLevel: 'info',
  payload: {
    environment: process.env.NODE_ENV
  }
});
