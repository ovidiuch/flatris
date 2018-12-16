// @flow

// Import this before anything else
import './env-set-prod';

import http from 'http';
import { attachSocket } from './socket';
import { createApp } from './express';
import { addRoutes } from './api';
import { startNextApp } from './next';

const app = createApp();
const server = http.createServer(app);

attachSocket(server);

addRoutes(app);

startNextApp(app, server);
