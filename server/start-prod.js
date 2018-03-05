// @flow

import http from 'http';
import { setDefaultEnv } from './env';
import { attachSocket } from './socket';
import { createApp } from './express';
import { addRoutes } from './api';
import { startNextApp } from './next';

setDefaultEnv('production');

const app = createApp();
const server = http.createServer(app);

attachSocket(server);

addRoutes(app);

startNextApp(app, server);
