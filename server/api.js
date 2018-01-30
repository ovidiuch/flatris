// @flow

import { getValidUser } from '../utils/validation';
import { games, sessions, insertUser, insertSession, insertGame } from './db';

export function addRoutes(app: express$Application) {
  app.get('/game/:gameId', (req: express$Request, res: express$Response) => {
    const gameId = req.params.gameId;

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
      const game = insertGame(user);

      res.json(game);
    } catch (err) {
      res.sendStatus(400);
    }
  });

  app.get('/auth', (req: express$Request, res: express$Response) => {
    const sessionId = req.cookies.sessionId;

    if (sessionId && sessions[sessionId]) {
      res.json(sessions[sessionId]);
    } else {
      res.sendStatus(401);
    }
  });

  app.post('/auth', (req: express$Request, res: express$Response) => {
    try {
      const { userName } = req.body;
      if (!userName) {
        throw new Error('Empty user name');
      }

      console.log('Create session', userName);
      const user = insertUser(userName);
      const session = insertSession(user.id);

      res.cookie('sessionId', session.id);
      res.json(user);
    } catch (err) {
      res.sendStatus(400);
    }
  });
}
