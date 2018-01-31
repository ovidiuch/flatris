/* global window */
// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { UP, DOWN, LEFT, RIGHT } from '../constants/keys';
import {
  isPlayer,
  getPlayer,
  getPlayer1,
  getPlayer2,
  allPlayersReady,
  isCurUserPlaying
} from '../reducers/game';
import { getCurGame } from '../reducers/cur-game';
import {
  joinGame,
  playerReady,
  runGameFrame,
  cancelGameFrame,
  drop,
  moveLeft,
  moveRight,
  rotate,
  enableAcceleration,
  disableAcceleration,
  appendPendingBlocks
} from '../actions';
import { withSocket } from '../utils/socket-connect';
import Well from './Well';
import GamePanel from './GamePanel';
import Rotate from './controls/Rotate';
import Left from './controls/Left';
import Right from './controls/Right';
import Drop from './controls/Drop';
import Flash from './effects/Flash';
import Quake from './effects/Quake';
import AuthForm from './AuthForm';

import type { User, Player, GameId, Game, State } from '../types/state';

type Props = {
  curUser: ?User,
  game: Game,
  openGame: (gameId: GameId) => void,
  closeGame: (gameId: GameId) => void,
  joinGame: typeof joinGame,
  playerReady: typeof playerReady,
  runGameFrame: typeof runGameFrame,
  drop: typeof drop,
  moveLeft: typeof moveLeft,
  moveRight: typeof moveRight,
  rotate: typeof rotate,
  enableAcceleration: typeof enableAcceleration,
  disableAcceleration: typeof disableAcceleration,
  appendPendingBlocks: typeof appendPendingBlocks
};

class FlatrisGame extends Component<Props> {
  /**
   * The Tetris game was originally designed and programmed by Alexey Pajitnov.
   * It was released on June 6, 1984 and has since become a world-wide
   * phenomenon. Read more about the game at http://en.wikipedia.org/wiki/Tetris
   */
  componentDidMount() {
    // window isn't available on the server side, but nor is componentDidMount
    // called on the server
    window.addEventListener('keydown', this.handleKeyDown);
    window.addEventListener('keyup', this.handleKeyUp);

    const { curUser, game, openGame, drop, runGameFrame } = this.props;
    openGame(game.id);

    // Start game if playing user returned after possibly being disconnected
    if (isCurUserPlaying(game, curUser)) {
      runGameFrame(drop);
    }
  }

  componentDidUpdate(prevProps) {
    const prevGame = prevProps.game;
    const {
      curUser,
      game,
      drop,
      runGameFrame,
      appendPendingBlocks
    } = this.props;

    if (curUser && isCurUserPlaying(game, curUser)) {
      // Begin game animation when both players are ready (runs on each client)
      if (!allPlayersReady(prevGame)) {
        runGameFrame(drop);
      }

      const player = getPlayer(game, curUser.id);
      if (player.blocksPending.length) {
        // Ensure enemy blocks have been rendered "under the fold", before
        // transitioning them into the visible wall. It's weird, but without
        // setTimeout() pending blocks don't get rendered before they are
        // appended (Redux action batching?) and the transition doesn't occur
        setTimeout(() => {
          appendPendingBlocks();
        });
      }
    }
  }

  componentWillUnmount() {
    // window isn't available on the server side, but nor is componentDidMount
    // called on the server
    window.removeEventListener('keydown', this.handleKeyDown);
    window.removeEventListener('keyup', this.handleKeyUp);

    const { game, closeGame } = this.props;
    closeGame(game.id);

    cancelGameFrame();
  }

  handleJoin = () => {
    const { curUser, game, joinGame } = this.props;

    if (curUser) {
      joinGame(game.id, curUser);
    }
  };

  handleKeyDown = e => {
    // TEMP: Until menus are created
    if (e.keyCode === 82) {
      this.props.playerReady();
      return;
    }

    // Prevent page from scrolling when pressing arrow keys
    if (_.values([UP, DOWN, LEFT, RIGHT]).indexOf(e.keyCode) !== -1) {
      e.preventDefault();
    }

    if (!this.isCurUserPlaying()) {
      return;
    }

    const { enableAcceleration, rotate, moveLeft, moveRight } = this.props;

    switch (e.keyCode) {
      case 88: // X key
        // TEMP: Escape hatch to stop the game. Remove in final version
        cancelGameFrame();
        break;
      case DOWN:
        enableAcceleration();
        break;
      case UP:
        rotate();
        break;
      case LEFT:
        moveLeft();
        break;
      case RIGHT:
        moveRight();
        break;
      default:
    }
  };

  handleKeyUp = e => {
    if (!this.isCurUserPlaying()) {
      return;
    }

    if (e.keyCode === DOWN) {
      const { disableAcceleration } = this.props;
      disableAcceleration();
    }
  };

  handleRotatePress = e => {
    if (!this.isCurUserPlaying()) {
      return;
    }

    e.preventDefault();

    const { rotate } = this.props;
    rotate();
  };

  handleLeftPress = e => {
    if (!this.isCurUserPlaying()) {
      return;
    }

    e.preventDefault();

    const { moveLeft } = this.props;
    moveLeft();
  };

  handleRightPress = e => {
    if (!this.isCurUserPlaying()) {
      return;
    }

    e.preventDefault();

    const { moveRight } = this.props;
    moveRight();
  };

  handlePullPress = e => {
    if (!this.isCurUserPlaying()) {
      return;
    }

    e.preventDefault();

    const { enableAcceleration } = this.props;
    enableAcceleration();
  };

  handlePullRelease = e => {
    if (!this.isCurUserPlaying()) {
      return;
    }

    e.preventDefault();

    const { disableAcceleration } = this.props;
    disableAcceleration();
  };

  isCurUserPlaying() {
    const { curUser, game } = this.props;

    return isCurUserPlaying(game, curUser);
  }

  renderControlIcon(path) {
    return (
      <svg viewBox="0 0 24 24">
        <path d={path} />
      </svg>
    );
  }

  renderControls() {
    return (
      <div className="controls">
        <div className="button">
          <Rotate onPress={this.handleRotatePress} />
        </div>
        <div className="button">
          <Left onPress={this.handleLeftPress} />
        </div>
        <div className="button">
          <Right onPress={this.handleRightPress} />
        </div>
        <div className="button">
          <Drop
            onPress={this.handlePullPress}
            onRelease={this.handlePullRelease}
          />
        </div>
        <style jsx>{`
          .controls {
            position: absolute;
            top: calc(100% * 20 / 24);
            bottom: 0;
            left: 0;
            right: 0;
          }

          .controls .button {
            position: relative;
            float: left;
            width: 25%;
            height: 100%;
          }
        `}</style>
      </div>
    );
  }

  renderWell(player: Player) {
    const {
      grid,
      blocksCleared,
      blocksPending,
      activeTetromino,
      activeTetrominoGrid,
      activeTetrominoPosition
    } = player;

    return (
      <Well
        grid={grid}
        blocksCleared={blocksCleared}
        blocksPending={blocksPending}
        activeTetromino={activeTetromino}
        activeTetrominoGrid={activeTetrominoGrid}
        activeTetrominoPosition={activeTetrominoPosition}
      />
    );
  }

  renderScreens() {
    const { curUser, game } = this.props;
    const player1 = getPlayer1(game, curUser);
    const player2 = getPlayer2(game, player1);
    const isCurPlayer = isPlayer(game, curUser);

    if (isCurPlayer) {
      return null;
    }

    const noRoomLeft = Boolean(player2);
    const authToJoin = !player2 && !curUser;
    const readyToJoin = !player2 && curUser;

    return (
      <div className="screen-container">
        {noRoomLeft && <div>Game is full</div>}
        {authToJoin && <AuthForm />}
        {readyToJoin && (
          <button onClick={this.handleJoin}>Press to join</button>
        )}
        <style jsx>{`
          .screen-container {
            position: absolute;
            top: 0;
            left: 0;
            right: calc(100% / 16 * 6);
            height: calc(100% / 24 * 20);
            background: rgba(236, 240, 241, 0.85);
          }
        `}</style>
      </div>
    );
  }

  render() {
    const { curUser, game } = this.props;
    const player1 = getPlayer1(game, curUser);
    const player2 = getPlayer2(game, player1);

    return (
      <div className="flatris-game">
        <Quake player1={player1} player2={player2}>
          <div className="well-container">
            {player2 && (
              <div className="enemy-well">{this.renderWell(player2)}</div>
            )}
            <Flash player={player1}>{this.renderWell(player1)}</Flash>
          </div>
          {this.renderScreens()}
          <div className="game-panel-container">
            <GamePanel curUser={curUser} game={game} />
          </div>
          {this.renderControls()}
        </Quake>
        <style jsx>{`
          .flatris-game {
            position: absolute;
            top: 0;
            bottom: 0;
            left: 0
            right: 0;
          }

          .well-container {
            position: absolute;
            top: 0;
            left: 0;
            right: calc(100% / 16 * 6);
            background: #ecf0f1;
          }

          .game-panel-container {
            position: absolute;
            top: 0;
            right: 0;
            left: calc(100% / 16 * 10);
            background: #fff;
          }

          .well-container,
          .game-panel-container {
            height: calc(100% / 24 * 20);
          }

          .enemy-well {
            position: absolute;
            top: 0;
            bottom: 0;
            left: 0;
            right: 0;
            opacity: 0.15;
            filter: grayscale(80%);
          }
        `}</style>
      </div>
    );
  }
}

const mapStateToProps = (state: State): $Shape<Props> => ({
  curUser: state.curUser,
  game: getCurGame(state)
});

const mapDispatchToProps = {
  runGameFrame
};

const syncActions = {
  joinGame,
  playerReady,
  drop,
  moveLeft,
  moveRight,
  rotate,
  enableAcceleration,
  disableAcceleration,
  appendPendingBlocks
};

export default connect(mapStateToProps, mapDispatchToProps)(
  withSocket(FlatrisGame, syncActions)
);
