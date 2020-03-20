// @flow

import { find } from 'lodash';
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
import {
  getStats,
  getDailyStats,
  incrementUserCount,
  incrementGameCount
} from './firebase';

import type { User } from 'shared/types/state';
import type { BackfillRequest, BackfillResponse } from 'shared/types/api';
import type { SessionId } from './db';

export function addRoutes(app: express$Application) {
  app.get('/dashboard', async (req: express$Request, res: express$Response) => {
    try {
      res.json({
        // NOTE: This is returned as an array instead of map in order to allow
        // sorting in the future
        games: activeGames.map(gameId => games[gameId]),
        stats: await getStats()
      });
    } catch (err) {
      res.sendStatus(500);
    }
  });

  app.get(
    '/daily-stats',
    async (req: express$Request, res: express$Response) => {
      try {
        res.json({
          days: await getDailyStats()
        });
      } catch (err) {
        res.sendStatus(500);
      }
    }
  );

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
      const user = getUserFromReqSession(req);
      try {
        const game = insertGame(user);

        console.log('Create game', game.id, user);
        incrementGameCount();

        res.json(game);
      } catch (err) {
        res.sendStatus(400);
      }
    } catch (err) {
      res.sendStatus(401);
    }
  });

  app.post('/backfill', (req: express$Request, res: express$Response) => {
    try {
      console.log('Backfill...');
      console.log(JSON.stringify(req.body, null, 2));

      const backfillReq = extractBackfillRequest(req.body);
      const { gameId } = backfillReq;

      if (!games[gameId]) {
        console.warn(`Can't backfill missing game ${gameId}`);
        res.sendStatus(404);
      } else {
        const backfillRes = getBackfillRes(backfillReq);
        res.json(backfillRes);
      }
    } catch (err) {
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
      if (!req.body || typeof req.body.userName !== 'string') {
        throw new Error('Empty user name');
      }

      const user = insertUser(req.body.userName);
      const session = insertSession(user.id);

      const numSessions = Object.keys(sessions).length;
      console.log(`Create session #${numSessions}`, session.id, user);
      incrementUserCount();

      res.cookie('sessionId', session.id);
      res.json(user);
    } catch (err) {
      res.sendStatus(400);
    }
  });

  app.get('/debug/:gameId', (req: express$Request, res: express$Response) => {
    const gameId = req.params.gameId;

    if (gameId && games[gameId]) {
      res.json({
        game: games[gameId],
        actions: gameActions[gameId]
      });
    } else {
      res.sendStatus(404);
    }
  });
}

function getUserFromReqSession(req: express$Request): User {
  const sessionId: SessionId = req.cookies.sessionId;
  if (!sessionId) {
    throw new Error(`Session not found in cookies`);
  }

  const session = sessions[sessionId];
  if (!session) {
    throw new Error(`Invalid session id ${sessionId}`);
  }

  const { userId } = session;

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

function getBackfillRes(req: BackfillRequest): BackfillResponse {
  const { gameId, players } = req;
  const actions = gameActions[gameId].filter(action => {
    const player = find(
      players,
      ({ userId }) => userId === action.payload.userId
    );

    return (
      // Include all actions of users that the user who requested the backfill
      // isn't aware of (ie. users that joined since last backfill)
      !player || (player && action.payload.actionId > player.from)
    );
  });

  return { gameId, actions };
}
