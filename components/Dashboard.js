// @flow

import { difference } from 'lodash';
import classNames from 'classnames';
import React, { Fragment, Component } from 'react';
import Link from 'next/link';
import { connect } from 'react-redux';
import { GAME_INACTIVE_TIMEOUT } from '../constants/timeouts';
import { createTimeoutBumper } from '../utils/timeout-bumper';
import { closeGame, removeGame } from '../actions/global';
import { withSocket } from './socket/SocketConnect';
import GamePreview from './GamePreview';
import Button from './Button';
import Logo from './Logo';

import type { User, GameId, Game, Games, State } from '../types/state';
import type { RoomId } from '../types/api';

type Props = {
  curUser: ?User,
  games: Games,
  curGame: ?GameId,
  subscribe: (roomId: RoomId) => mixed,
  closeGame: () => mixed,
  removeGame: (gameId: GameId) => mixed
};

type LocalState = {
  gamesCopy: Games,
  added: Array<GameId>
};

class Dashboard extends Component<Props, LocalState> {
  transitionTimeout: ?TimeoutID;

  bumpTimeout: (id: string) => mixed;
  cancelAllTimeouts: () => mixed;

  constructor(props) {
    super(props);

    this.state = {
      gamesCopy: props.games,
      added: []
    };

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
    const ids = Object.keys(games);

    if (games !== prevGames) {
      const added = difference(ids, Object.keys(prevGames));
      const newState = {
        // Keep current games as well as just-removed games in state
        gamesCopy: { ...this.state.gamesCopy, ...games },
        added: [...this.state.added, ...added]
      };
      this.setState(newState, this.scheduleTransitionTimeout);
    }

    ids.forEach(gameId => {
      if (games[gameId] !== prevGames[gameId]) {
        this.bumpTimeout(gameId);
      }
    });
  }

  componentWillUnmount() {
    this.cancelTransitionTimeout();
    this.cancelAllTimeouts();
  }

  scheduleTransitionTimeout = () => {
    this.cancelTransitionTimeout();
    this.transitionTimeout = setTimeout(this.handleClearTransitions, 550);
  };

  cancelTransitionTimeout() {
    if (this.transitionTimeout) {
      clearTimeout(this.transitionTimeout);
    }
  }

  handleClearTransitions = () => {
    const { games } = this.props;

    this.setState({
      gamesCopy: games,
      added: []
    });
  };

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
    const { curUser } = this.props;
    const { gamesCopy } = this.state;

    const ownGames = [];
    const otherGames = [];
    Object.keys(gamesCopy).forEach(gameId => {
      const game = gamesCopy[gameId];
      if (curUser && game.players.some(p => p.user.id === curUser.id)) {
        ownGames.push(game);
      } else {
        otherGames.push(game);
      }
    });

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
        {!ownGames.length &&
          !otherGames.length && (
            <div className="message">Create a game and break the silence!</div>
          )}
        {ownGames.length > 0 && (
          <Fragment>
            <div className="message">Your games</div>
            {this.renderGameGrid(ownGames)}
          </Fragment>
        )}
        {otherGames.length > 0 && (
          <Fragment>
            {!ownGames.length ? (
              <div className="message">
                Join a game below or create a new one
              </div>
            ) : (
              <div className="message">Other games</div>
            )}
            {this.renderGameGrid(otherGames)}
          </Fragment>
        )}
        <style jsx>{`
          .root {
            font-size: 18px;
          }

          .header {
            padding: 20px;
            min-width: 280px;
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
        `}</style>
      </div>
    );
  }

  renderGameGrid(games: Array<Game>) {
    const { added } = this.state;

    return (
      <div className="game-grid">
        {games.map(game => {
          const { id } = game;
          const classes = classNames('game-preview', {
            'game-added': added.indexOf(id) !== -1,
            'game-removed': !this.props.games[id]
          });

          return (
            <Link key={id} href={`/join?g=${id}`} as={`/join/${id}`}>
              <div className={classes}>
                <GamePreview curUser={null} game={game} />
              </div>
            </Link>
          );
        })}
        <style jsx>{`
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
            transition: opacity 0.2s ease-in, transform 0.2s ease-in;
          }
          .game-added {
            animation: 0.5s added forwards;
          }
          .game-removed {
            animation: 0.5s removed forwards;
          }

          @keyframes added {
            0% {
              opacity: 0;
              transform: scale(0.9);
            }
            100% {
              opacity: 1;
              transform: scale(1);
            }
          }
          @keyframes removed {
            0% {
              opacity: 1;
              transform: scale(1);
            }
            100% {
              opacity: 0;
              transform: scale(0.9);
            }
          }
        `}</style>
      </div>
    );
  }
}

function mapStateToProps({ curUser, games, curGame }: State): $Shape<Props> {
  return {
    curUser,
    games,
    curGame
  };
}

const mapDispatchToProps = { closeGame, removeGame };

export default connect(mapStateToProps, mapDispatchToProps)(
  withSocket(Dashboard)
);
