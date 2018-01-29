// @flow

import type { Games } from './db';

export function addRoutes(app: express$Application, games: Games) {
  app.get('/game/:gameId', (req: express$Request, res: express$Response) => {
    const gameId = Number(req.params.gameId);

    if (gameId && games[gameId]) {
      res.json(games[gameId]);
    } else {
      res.sendStatus(404);
    }
  });
}
