// @flow

import {
  users,
  sessions,
  games,
  gameActions,
  activeGames,
  insertUser,
  insertSession,
  insertGame
} from './db';
import { rollbar } from './rollbar';

import type { User } from '../types/state';
import type { BackfillRequest, BackfillResponse } from '../types/api';
import type { SessionId } from './db';

export function addRoutes(app: express$Application) {
  app.get('/dashboard', (req: express$Request, res: express$Response) => {
    res.json({
      // NOTE: This is returned as an array instead of map in order to allow
      // sorting in the future
      games: activeGames.map(gameId => games[gameId])
    });
  });

  app.get('/game/:gameId', (req: express$Request, res: express$Response) => {
    const gameId = req.params.gameId;

    if (gameId && games[gameId]) {
      res.json(games[gameId]);
    } else {
      rollbar.warning(`Missing game ${gameId}`);
      res.sendStatus(404);
    }
  });

  app.post('/game', (req: express$Request, res: express$Response) => {
    try {
      const user = getUserFromReqSession(req);
      const game = insertGame(user);

      console.log('Create game', game.id, user);

      res.json(game);
    } catch (err) {
      rollbar.error(err);
      res.sendStatus(400);
    }
  });

  app.post('/backfill', (req: express$Request, res: express$Response) => {
    try {
      console.log('Backfill...');
      console.log(JSON.stringify(req.body, null, 2));

      const backfillReq = extractBackfillRequest(req.body);
      const { gameId } = backfillReq;

      if (!games[gameId]) {
        throw new Error(`Can't backfill missing game ${gameId}`);
      }

      const actions = getBackfillActions(backfillReq);
      res.json(actions);
    } catch (err) {
      rollbar.error(err);
      res.sendStatus(400);
    }
  });

  app.get('/auth', (req: express$Request, res: express$Response) => {
    try {
      const user = getUserFromReqSession(req);
      res.json(user);
    } catch (err) {
      res.sendStatus(401);
    }
  });

  app.post('/auth', (req: express$Request, res: express$Response) => {
    try {
      const { userName } = req.body;
      if (!userName) {
        throw new Error('Empty user name');
      }

      const user = insertUser(userName);
      const session = insertSession(user.id);

      const numSessions = Object.keys(sessions).length;
      console.log(`Create session #${numSessions}`, session.id, user);

      res.cookie('sessionId', session.id);
      res.json(user);
    } catch (err) {
      rollbar.error(err);
      res.sendStatus(400);
    }
  });
}

function getUserFromReqSession(req: express$Request): User {
  const sessionId: SessionId = req.cookies.sessionId;
  const { userId } = sessions[sessionId];

  return users[userId];
}

function extractBackfillRequest(req: mixed): BackfillRequest {
  if (!req || typeof req !== 'object') {
    throw new Error('Invalid backfill ranges');
  }

  const { gameId, players } = req;
  if (typeof gameId !== 'string' || !Array.isArray(players)) {
    throw new Error('Invalid backfill ranges');
  }

  return {
    gameId,
    players: players.map(playerRange => {
      if (!playerRange || typeof playerRange !== 'object') {
        throw new Error('Invalid backfill ranges');
      }

      const { userId, from } = playerRange;
      if (typeof userId !== 'string' || typeof from !== 'number') {
        throw new Error('Invalid backfill ranges');
      }

      return {
        userId,
        from
      };
    })
  };
}

function getBackfillActions(req: BackfillRequest): BackfillResponse {
  return gameActions[req.gameId].filter(action => {
    const player = req.players.find(
      ({ userId }) => userId === action.payload.userId
    );

    return (
      // Include all actions of users that the user who requested the backfill
      // isn't aware of (ie. users that joined since last backfill)
      !player || (player && action.payload.actionId > player.from)
    );
  });
}
