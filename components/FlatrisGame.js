/* global window */
// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { UP, DOWN, LEFT, RIGHT, SPACE } from '../constants/keys';
import {
  isPlayer,
  getPlayer,
  getPlayer1,
  getPlayer2,
  allPlayersReady
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
import NewGame from './screens/NewGame';
import JoinGame from './screens/JoinGame';
import GetReady from './screens/GetReady';
import WaitingForOther from './screens/WaitingForOther';
import GameOver from './screens/GameOver';

import type { Node } from 'react';
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
  componentDidMount() {
    const { curUser, game, openGame } = this.props;
    openGame(game.id);

    // Start game if playing user returned after possibly being disconnected
    if (isPlayer(game, curUser) && allPlayersReady(game)) {
      this.startGame();
    }
  }

  componentDidUpdate(prevProps) {
    const prevGame = prevProps.game;
    const { curUser, game, appendPendingBlocks } = this.props;

    if (curUser && isPlayer(game, curUser)) {
      if (allPlayersReady(game) && !allPlayersReady(prevGame)) {
        this.startGame();
      } else if (!allPlayersReady(game) && allPlayersReady(prevGame)) {
        this.stopGame();
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
    this.stopGame();

    const { game, closeGame } = this.props;
    closeGame(game.id);
  }

  attachKeyEvents() {
    // window isn't available on the server side, but nor is componentDidMount
    // called on the server
    window.addEventListener('keydown', this.handleKeyDown);
    window.addEventListener('keyup', this.handleKeyUp);
  }

  detachKeyEvents() {
    // window isn't available on the server side, but nor is componentWillUnmount
    // called on the server
    window.removeEventListener('keydown', this.handleKeyDown);
    window.removeEventListener('keyup', this.handleKeyUp);
  }

  startGame() {
    const { drop, runGameFrame } = this.props;

    this.attachKeyEvents();
    runGameFrame(drop);
  }

  stopGame() {
    this.detachKeyEvents();
    cancelGameFrame();
  }

  handleWatch = () => {
    console.log('Watch');
  };

  handleJoin = () => {
    const { curUser, game, joinGame } = this.props;

    if (curUser) {
      joinGame(game.id, curUser);
    }
  };

  handleReady = () => {
    this.props.playerReady();
  };

  handlePing = () => {
    console.log('Ping');
  };

  handleKeyDown = e => {
    // Prevent page from scrolling when pressing arrow keys
    if (_.values([UP, DOWN, LEFT, RIGHT]).indexOf(e.keyCode) !== -1) {
      e.preventDefault();
    }

    const { enableAcceleration, rotate, moveLeft, moveRight } = this.props;

    switch (e.keyCode) {
      case 88: // X key
        // TEMP: Escape hatch to stop the game. Remove in final version
        cancelGameFrame();
        break;
      case DOWN:
      case SPACE:
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
    if (e.keyCode === DOWN) {
      const { disableAcceleration } = this.props;
      disableAcceleration();
    }
  };

  handleRotatePress = e => {
    e.preventDefault();

    const { rotate } = this.props;
    rotate();
  };

  handleLeftPress = e => {
    e.preventDefault();

    const { moveLeft } = this.props;
    moveLeft();
  };

  handleRightPress = e => {
    e.preventDefault();

    const { moveRight } = this.props;
    moveRight();
  };

  handlePullPress = e => {
    e.preventDefault();

    const { enableAcceleration } = this.props;
    enableAcceleration();
  };

  handlePullRelease = e => {
    e.preventDefault();

    const { disableAcceleration } = this.props;
    disableAcceleration();
  };

  renderControlIcon(path) {
    return (
      <svg viewBox="0 0 24 24">
        <path d={path} />
      </svg>
    );
  }

  renderControls() {
    const { curUser, game } = this.props;
    const isGameRunning = isPlayer(game, curUser) && allPlayersReady(game);

    return (
      <div className="controls">
        <div className="button">
          <Rotate disabled={!isGameRunning} onPress={this.handleRotatePress} />
        </div>
        <div className="button">
          <Left disabled={!isGameRunning} onPress={this.handleLeftPress} />
        </div>
        <div className="button">
          <Right disabled={!isGameRunning} onPress={this.handleRightPress} />
        </div>
        <div className="button">
          <Drop
            disabled={!isGameRunning}
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

  // TODO: Show menu for users that are just watching
  renderScreens() {
    const { curUser, game } = this.props;
    const hasJoined = isPlayer(game, curUser);

    // P1 is the current user's player, P2 is the other (in multiplayer games)
    const player1 = getPlayer1(game, curUser);
    const player2 = getPlayer2(game, player1);

    if (!curUser) {
      return this.renderScreen(<AuthForm />);
    }

    if (!hasJoined) {
      return this.renderScreen(
        <JoinGame
          game={game}
          onWatch={this.handleWatch}
          onJoin={this.handleJoin}
        />
      );
    }

    // No screen when current user joined and game is running
    if (allPlayersReady(game)) {
      return null;
    }

    if (player1.status === 'LOST' || player1.status === 'WON') {
      return this.renderScreen(
        <GameOver curUser={curUser} game={game} onRestart={this.handleReady} />
      );
    }

    if (!player2) {
      // player1 status is 'PENDING', because if it wouldn've been 'READY'
      // allPlayersReady(game) would've returned true
      return this.renderScreen(<NewGame onPlay={this.handleReady} />);
    }

    if (player1.status === 'READY') {
      return this.renderScreen(<WaitingForOther onPing={this.handlePing} />);
    }

    // player1.status === 'PENDING'
    return this.renderScreen(<GetReady onReady={this.handleReady} />);
  }

  renderScreen(content: Node) {
    return (
      <div className="screen-container game-height">
        {content}
        <style jsx>{`
          .screen-container {
            position: absolute;
            top: 0;
            left: 0;
            right: calc(100% / 16 * 6);
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
          <div className="well-container game-height">
            {player2 && (
              <div className="enemy-well">{this.renderWell(player2)}</div>
            )}
            <Flash player={player1}>{this.renderWell(player1)}</Flash>
          </div>
          {this.renderScreens()}
          <div className="side-container game-height">
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

          .side-container {
            position: absolute;
            top: 0;
            right: 0;
            left: calc(100% / 16 * 10);
            background: #fff;
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
