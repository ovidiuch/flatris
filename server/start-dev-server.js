// @flow

import http from 'http';
import { setDefaultEnv } from './env';
import { startServer } from './http';
import { attachSocket } from './socket';
import { addRoutes } from './api';
import { createApp } from './express';

setDefaultEnv('development');

const app = createApp();
const server = http.createServer(app);

attachSocket(server);

// CORS
app.use(function(req: express$Request, res: express$Response, next) {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});

addRoutes(app);

startServer(server, 4000);
