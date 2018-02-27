// @flow

import React, { Fragment, Component } from 'react';
import Link from 'next/link';
import { connect } from 'react-redux';
import { closeGame } from '../actions/global';
import { withSocket } from './socket/SocketConnect';
import GamePreview from './GamePreview';

import type { GameId, Games, State } from '../types/state';
import type { RoomId } from '../types/api';

type Props = {
  gameCount: number,
  games: Games,
  curGame: ?GameId,
  subscribe: (roomId: RoomId) => mixed,
  closeGame: () => mixed
};

class Dashboard extends Component<Props> {
  componentDidMount() {
    const { curGame, subscribe, closeGame } = this.props;

    subscribe('global');

    // clear state.curGame when navigating back to dashboard from game page
    if (curGame) {
      closeGame();
    }
  }

  // TODO: Update state.following when state.games will update via websocket

  render() {
    const { gameCount, games } = this.props;

    // FIXME: Link/a/GamePreview
    return (
      <Fragment>
        <p>
          <Link href="/new">
            <a>Create game</a>
          </Link>
        </p>
        <p>
          Games: <strong>{gameCount}</strong>
        </p>
        <div className="game-grid">
          {Object.keys(games).map(gameId => (
            <div className="game-preview" key={gameId}>
              <Link prefetch href={`/join?g=${gameId}`} as={`/join/${gameId}`}>
                <a>
                  <GamePreview curUser={null} game={games[gameId]} />
                </a>
              </Link>
            </div>
          ))}
        </div>
        <style jsx>{`
          .game-grid {
            overflow: hidden; /* clear the floats old school style */
          }
          .game-preview {
            float: left;
            position: relative;
            width: 320px;
            height: 400px;
            margin: 20px;
            font-size: 12px;
          }
        `}</style>
      </Fragment>
    );
  }
}

function mapStateToProps({ gameCount, games, curGame }: State): $Shape<Props> {
  return {
    gameCount,
    games,
    curGame
  };
}

const mapDispatchToProps = { closeGame };

export default connect(mapStateToProps, mapDispatchToProps)(
  withSocket(Dashboard)
);
