// @flow

import http from 'http';
import express from 'express';
import { setDefaultEnv } from './env';
import { startServer } from './http';
import { attachSocket } from './socket';
import { addRoutes } from './express';
import { games } from './db';

setDefaultEnv('development');

const app = express();
const server = http.createServer(app);

attachSocket({ server, games });

// CORS
app.use(function(req: express$Request, res: express$Response, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});

addRoutes(app, games);

startServer(server, 4000);
