// @flow

import next from 'next';
import { startServer } from './http';

export async function startNextApp(
  app: express$Application,
  server: net$Server
) {
  const dev = process.env.NODE_ENV !== 'production';
  const nextApp = next({ dev });
  const nextHandler = nextApp.getRequestHandler();

  await nextApp.prepare();

  app.get('/join/:id', (req: express$Request, res: express$Response) => {
    const params = { g: req.params.id };
    return nextApp.render(req, res, '/join', params);
  });

  app.get('*', (req: express$Request, res: express$Response) => {
    return nextHandler(req, res);
  });

  startServer(server, 3000);
}
