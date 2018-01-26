// @flow

import http from 'http';
import express from 'express';
import next from 'next';
import { setDefaultEnv } from './env';
import { startServer } from './http';
import { attachSocket } from './socket';
import { addRoutes } from './express';
import { games } from './db';

setDefaultEnv('production');

const app = express();
const server = http.createServer(app);

attachSocket({ server, games });

const dev = process.env.NODE_ENV !== 'production';
const nextApp = next({ dev });
const nextHandler = nextApp.getRequestHandler();

nextApp.prepare().then(() => {
  addRoutes(app, games);

  app.get('*', (req: express$Request, res: express$Response) => {
    return nextHandler(req, res);
  });

  startServer(server, 3000);
});
