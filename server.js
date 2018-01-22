// @flow

import http from 'http';
import socketIo from 'socket.io';
import express from 'express';
import { gameReducer } from './reducers/game';

import type { GameId, Game } from './types/state';
import type { GameAction } from './types/actions';

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});

const games: { [id: GameId]: Game } = {};

io.on('connect', socket => {
  socket.on('message', (action: GameAction) => {
    const { gameId } = action.payload;
    if (action.type === 'CREATE_GAME') {
      games[gameId] = gameReducer(undefined, action);
    } else {
      games[gameId] = gameReducer(games[gameId], action);
    }

    console.log('emit', action);
    socket.broadcast.emit('message', action);
  });
});

app.get('/games', (req, res) => {
  res.json(games);
});

const port = parseInt(process.env.PORT, 10) || 4000;

server.listen(port, err => {
  if (err) throw err;
  console.log(`> Ready on http://localhost:${port}`);
});
