// @flow

// Import this before anything else
import './env-set-dev';

import http from 'http';
import { createApp } from './express';
import { startNextApp } from './next';

const app = createApp();
const server = http.createServer(app);

startNextApp(app, server);
