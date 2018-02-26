// @flow

import {
  users,
  sessions,
  games,
  gameActions,
  insertUser,
  insertSession,
  insertGame
} from './db';

import type { User, GameId } from '../types/state';
import type { GameAction, BackfillRanges } from '../types/actions';
import type { SessionId } from './db';

export function addRoutes(app: express$Application) {
  app.get('/dashboard', (req: express$Request, res: express$Response) => {
    res.json({
      gameCount: Object.keys(games).length,
      // TODO: Filter out inactive games
      games
    });
  });

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
      const game = insertGame(user);

      const numGames = Object.keys(games).length;
      console.log(`Create game #${numGames}`, game.id, user);

      res.json(game);
    } catch (err) {
      res.sendStatus(400);
    }
  });

  app.post('/backfill', (req: express$Request, res: express$Response) => {
    try {
      console.log('Backfill...');
      console.log(JSON.stringify(req.body.ranges, null, 2));

      const ranges = extractBackfillRanges(req.body.ranges);
      const actions = getBackfillActions(ranges);

      res.json(actions);
    } catch (err) {
      console.log(err);
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
      res.sendStatus(400);
    }
  });
}

function getUserFromReqSession(req: express$Request): User {
  const sessionId: SessionId = req.cookies.sessionId;
  const { userId } = sessions[sessionId];

  return users[userId];
}

function extractBackfillRanges(ranges: mixed): BackfillRanges {
  if (!ranges || !Array.isArray(ranges)) {
    throw new Error('Invalid backfill ranges');
  }

  return ranges.map(gameRanges => {
    if (!gameRanges || typeof gameRanges !== 'object') {
      throw new Error('Invalid backfill ranges');
    }

    const { gameId, players } = gameRanges;
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
  });
}

function getBackfillActions(
  ranges: BackfillRanges
): { [GameId]: Array<GameAction> } {
  const actions = {};

  ranges.forEach(({ gameId, players }) => {
    actions[gameId] = gameActions[gameId].filter(action => {
      return (
        // Include JOIN_GAME actions of users that the user who requested
        // the backfill isn't aware of
        (action.type === 'JOIN_GAME' &&
          !players.some(({ userId }) => userId === action.payload.userId)) ||
        players.some(
          ({ userId, from }) =>
            action.payload.userId === userId && action.payload.actionId > from
        )
      );
    });
  });

  return actions;
}
