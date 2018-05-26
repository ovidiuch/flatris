// @flow

import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import { rollbar } from './rollbar';

export function createApp(): express$Application {
  const app = express();
  app.use(bodyParser.json());
  app.use(cookieParser());
  app.use(rollbar.errorHandler());

  return app;
}
