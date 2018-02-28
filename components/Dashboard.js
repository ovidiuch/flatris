// @flow

import React, { Component } from 'react';
import Link from 'next/link';
import { connect } from 'react-redux';
import { GAME_INACTIVE_TIMEOUT } from '../constants/timeouts';
import { createTimeoutBumper } from '../utils/timeout-bumper';
import { closeGame, removeGame } from '../actions/global';
import { withSocket } from './socket/SocketConnect';
import GamePreview from './GamePreview';
import Button from './Button';
import Logo from './Logo';

import type { GameId, Games, State } from '../types/state';
import type { RoomId } from '../types/api';

type Props = {
  games: Games,
  curGame: ?GameId,
  subscribe: (roomId: RoomId) => mixed,
  closeGame: () => mixed,
  removeGame: (gameId: GameId) => mixed
};

class Dashboard extends Component<Props> {
  bumpTimeout: (id: string) => mixed;
  cancelAllTimeouts: () => mixed;

  constructor(props) {
    super(props);

    // We're tracking game activity here because this is also the (only)
    // component that subscribes to `global` (all game rooms)
    const { bumpTimeout, cancelAllTimeouts } = createTimeoutBumper({
      handler: this.handleInactiveGame,
      timeout: GAME_INACTIVE_TIMEOUT
    });

    this.bumpTimeout = bumpTimeout;
    this.cancelAllTimeouts = cancelAllTimeouts;
  }

  componentDidMount() {
    const { games, curGame, subscribe, closeGame } = this.props;

    subscribe('global');

    // clear state.curGame when navigating back to dashboard from game page
    if (curGame) {
      closeGame();
    }

    Object.keys(games).forEach(this.bumpTimeout);
  }

  componentDidUpdate({ games: prevGames }) {
    const { games } = this.props;
    Object.keys(games).forEach(gameId => {
      if (games[gameId] !== prevGames[gameId]) {
        this.bumpTimeout(gameId);
      }
    });
  }

  componentWillUnmount() {
    this.cancelAllTimeouts();
  }

  handleInactiveGame = (gameId: GameId) => {
    const { curGame } = this.props;

    if (gameId === curGame) {
      // In theory this should never be reached
      console.warn('Detected current game as inactive');
    } else {
      console.log(`Removing inactive game ${gameId}`);
      this.props.removeGame(gameId);
    }
  };

  render() {
    const { games } = this.props;
    const hasGames = Object.keys(games).length > 0;

    return (
      <div className="root">
        <div className="header">
          <div className="new-game-button">
            <Link href="/new">
              <Button>New game</Button>
            </Link>
          </div>
          <div className="logo">
            <Logo color="#ecf0f1" />
          </div>
        </div>
        <div className="message">
          {hasGames ? (
            <span>Join a game below or create a new one.</span>
          ) : (
            <span>No active games. Create a game and break the silence!</span>
          )}
        </div>
        <div className="game-grid">
          {Object.keys(games).map(gameId => (
            <Link
              key={gameId}
              prefetch
              href={`/join?g=${gameId}`}
              as={`/join/${gameId}`}
            >
              <div className="game-preview">
                <GamePreview curUser={null} game={games[gameId]} />
              </div>
            </Link>
          ))}
        </div>
        <style jsx>{`
          .root {
            background: #fff;
            font-size: 18px;
          }

          .header {
            padding: 20px;
            height: 60px;
          }

          .new-game-button {
            float: left;
            position: relative;
            width: 160px;
            height: 60px;
          }

          .logo {
            float: right;
            position: relative;
            width: 90px;
            height: 60px;
          }

          .message {
            padding: 20px;
            padding-top: 0;
            line-height: 1.5em;
            color: #9ba4ab;
          }

          .game-grid {
            overflow: hidden; /* clear the floats old school style */
          }

          .game-preview {
            float: left;
            position: relative;
            width: 320px;
            height: 400px;
            margin: 0 0 20px 20px;
            font-size: 12px;
            cursor: pointer;
          }
        `}</style>
      </div>
    );
  }
}

function mapStateToProps({ games, curGame }: State): $Shape<Props> {
  return {
    games,
    curGame
  };
}

const mapDispatchToProps = { closeGame, removeGame };

export default connect(mapStateToProps, mapDispatchToProps)(
  withSocket(Dashboard)
);
