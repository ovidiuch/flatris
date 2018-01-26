// @flow

import type { Games } from './db';

export function addRoutes(app: express$Application, games: Games) {
  app.get('/games', (req: express$Request, res: express$Response) => {
    res.json(games);
  });
}
