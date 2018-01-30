// @flow

import http from 'http';
import { setDefaultEnv } from './env';
import { createApp } from './express';
import { startNextApp } from './next';

setDefaultEnv('development');

const app = createApp();
const server = http.createServer(app);

startNextApp(app, server);
