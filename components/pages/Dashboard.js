// @flow

import { difference } from 'lodash';
import classNames from 'classnames';
import React, { Fragment, Component } from 'react';
import Link from 'next/link';
import { connect } from 'react-redux';
import { GAME_INACTIVE_TIMEOUT } from '../../constants/timeouts';
import { createTimeoutBumper } from '../../utils/timeout-bumper';
import { closeGame, removeGame } from '../../actions/global';
import { withSocket } from '../socket/SocketConnect';
import Title from '../Title';
import GamePreview from '../GamePreview';
import GamePreviewShell from '../GamePreviewShell';
import Button from '../Button';
import Logo from '../Logo';

import type { User, GameId, Game, Games, State } from '../../types/state';
import type { RoomId } from '../../types/api';

type Props = {
  curUser: ?User,
  games: Games,
  curGame: ?GameId,
  subscribe: (roomId: RoomId) => mixed,
  onGameKeepAlive: (handler: (gameId: GameId) => void) => mixed,
  offGameKeepAlive: (handler: (gameId: GameId) => void) => mixed,
  closeGame: () => mixed,
  removeGame: (gameId: GameId) => mixed
};

type LocalState = {
  gamesCopy: Games,
  added: Array<GameId>
};

class Dashboard extends Component<Props, LocalState> {
  transitionTimeout: ?TimeoutID;

  bumpInactiveTimeout: (id: string) => void;
  cancelInactiveTimeouts: () => void;

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

    this.bumpInactiveTimeout = bumpTimeout;
    this.cancelInactiveTimeouts = cancelAllTimeouts;
  }

  componentDidMount() {
    const {
      games,
      curGame,
      subscribe,
      onGameKeepAlive,
      closeGame
    } = this.props;

    subscribe('global');

    // Bump inactive timeout on every game keep-alive signal
    onGameKeepAlive(this.bumpInactiveTimeout);

    // clear state.curGame when navigating back to dashboard from game page
    if (curGame) {
      closeGame();
    }

    Object.keys(games).forEach(this.bumpInactiveTimeout);
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

    ids
      .filter(gameId => games[gameId] !== prevGames[gameId])
      .forEach(this.bumpInactiveTimeout);
  }

  componentWillUnmount() {
    this.props.offGameKeepAlive(this.bumpInactiveTimeout);
    this.cancelTransitionTimeout();
    this.cancelInactiveTimeouts();
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
      console.log('Removing inactive game', gameId);
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
    const hasOwnGames = ownGames.length > 0;
    const hasOtherGames = otherGames.length > 0;
    const hasAnyGames = hasOwnGames || hasOtherGames;
    const title = hasAnyGames
      ? `(${ownGames.length + otherGames.length}) Flatris`
      : 'Flatris';

    return (
      <Fragment>
        <Title>{title}</Title>
        <div className="root">
          <div className="header">
            <div className="left new-game-button">
              <Link href="/new">
                <Button>New game</Button>
              </Link>
            </div>
            <div className="right">
              <div className="view-source left">
                <a href="https://github.com/skidding/flatris" target="_blank">
                  <Button
                    bgColor="#ecf0f1"
                    color="#34495f"
                    colorDisabled="rgba(52, 73, 95, 0.6)"
                  >
                    Github
                  </Button>
                </a>
              </div>
              <div className="logo left">
                <Logo color="#ecf0f1" />
              </div>
            </div>
          </div>
          {!hasAnyGames && (
            <Fragment>
              <div className="message">
                Create a game and break the silence!
              </div>
              {this.renderGameGrid([], true)}
            </Fragment>
          )}
          {hasOwnGames && (
            <Fragment>
              <div className="message">Your games</div>
              {this.renderGameGrid(ownGames, !hasOtherGames)}
            </Fragment>
          )}
          {hasOtherGames && (
            <Fragment>
              {!hasOwnGames ? (
                <div className="message">Join a game or create a new one</div>
              ) : (
                <div className="message">Other games</div>
              )}
              {this.renderGameGrid(otherGames, true)}
            </Fragment>
          )}
          <style jsx>{`
            .root {
              font-size: 18px;
            }

            .left {
              float: left;
            }
            .right {
              float: right;
            }

            .header {
              padding: 20px;
              min-width: 270px;
              height: 60px;
            }
            .new-game-button {
              position: relative;
              width: 160px;
              height: 60px;
            }
            .view-source {
              position: relative;
              width: 120px;
              height: 60px;
              line-height: 60px;
              text-align: center;
            }

            .logo {
              float: right;
              position: relative;
              width: 90px;
              height: 60px;
              margin-left: 20px;
            }
            @media (max-width: 449px) {
              .logo {
                display: none;
              }
            }

            .message {
              padding: 20px;
              padding-top: 0;
              line-height: 1.5em;
              color: #9ba4ab;
            }
          `}</style>
        </div>
      </Fragment>
    );
  }

  renderGameGrid(games: Array<Game>, showTrailingShell = false) {
    const { curUser } = this.props;
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
                <GamePreview curUser={curUser} game={game} />
              </div>
            </Link>
          );
        })}
        {showTrailingShell && (
          <Link key="new-game" href="/new">
            <div className="game-preview">
              <GamePreviewShell />
            </div>
          </Link>
        )}
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
