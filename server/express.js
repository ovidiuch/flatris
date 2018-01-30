// @flow

import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import { getValidUser } from '../utils/validation';
import { getBlankGame } from '../reducers/game';
import { games, sessions } from './db';

export function addRoutes(app: express$Application) {
  app.get('/game/:gameId', (req: express$Request, res: express$Response) => {
    const gameId = Number(req.params.gameId);

    if (gameId && games[gameId]) {
      res.json(games[gameId]);
    } else {
      res.sendStatus(404);
    }
  });

  app.post('/game', (req: express$Request, res: express$Response) => {
    try {
      const user = getValidUser(req.body.user);

      console.log('Create game', user);
      const gameId = Date.now();
      const game = getBlankGame({ id: gameId, user });
      games[gameId] = game;

      res.json(game);
    } catch (err) {
      res.sendStatus(400);
    }
  });

  app.get('/auth', (req: express$Request, res: express$Response) => {
    const sessionId = Number(req.cookies.sessionId);

    if (sessionId && sessions[sessionId]) {
      res.json(sessions[sessionId]);
    } else {
      res.sendStatus(401);
    }
  });

  app.post('/auth', (req: express$Request, res: express$Response) => {
    try {
      const user = getValidUser(req.body.user);

      console.log('Create session', user);
      const sessionId = Date.now();
      sessions[sessionId] = user;

      res.cookie('sessionId', String(sessionId));
      res.json({});
    } catch (err) {
      res.sendStatus(400);
    }
  });
}

export function createApp(): express$Application {
  const app = express();
  app.use(bodyParser());
  app.use(cookieParser());

  return app;
}
