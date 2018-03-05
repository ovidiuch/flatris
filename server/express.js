// @flow

import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';

export function createApp(): express$Application {
  const app = express();
  app.use(bodyParser.json());
  app.use(cookieParser());

  return app;
}
