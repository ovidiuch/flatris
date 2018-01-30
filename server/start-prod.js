// @flow

import http from 'http';
import next from 'next';
import { setDefaultEnv } from './env';
import { startServer } from './http';
import { attachSocket } from './socket';
import { createApp, addRoutes } from './express';

setDefaultEnv('production');

const app = createApp();
const server = http.createServer(app);

attachSocket(server);

const dev = process.env.NODE_ENV !== 'production';
const nextApp = next({ dev });
const nextHandler = nextApp.getRequestHandler();

nextApp.prepare().then(() => {
  addRoutes(app);

  app.get('*', (req: express$Request, res: express$Response) => {
    return nextHandler(req, res);
  });

  startServer(server, 3000);
});
