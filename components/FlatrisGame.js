/* global window */
// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { UP, DOWN, LEFT, RIGHT, SPACE } from '../constants/keys';
import {
  isPlayer,
  getPlayer,
  getCurPlayer,
  getOtherPlayer,
  allPlayersReady
} from '../reducers/game';
import { getCurGame } from '../reducers/cur-game';
import {
  joinGame,
  playerReady,
  playerPause,
  drop,
  moveLeft,
  moveRight,
  rotate,
  enableAcceleration,
  disableAcceleration,
  appendPendingBlocks,
  ping
} from '../actions/game';
import { runGameFrame, cancelGameFrame } from '../actions/game-frame';
import { withSocket } from './socket/SocketConnect';
import { isMobileDevice } from '../utils/events';
import GameContainer from './containers/GameContainer';
import Button from './Button';
import Well from './Well';
import GamePanel from './GamePanel';
import PortraitControls from './controls/PortraitControls';
import LandscapeControls from './controls/LandscapeControls';
import Flash from './effects/Flash';
import Quake from './effects/Quake';
import FadeIn from './effects/FadeIn';
import NewGame from './screens/NewGame';
import Auth from './screens/Auth';
import JoinGame from './screens/JoinGame';
import GameFull from './screens/GameFull';
import GetReady from './screens/GetReady';
import WaitingForOther from './screens/WaitingForOther';
import GameOver from './screens/GameOver';

import type { Node } from 'react';
import type { User, Player, GameId, Game, State } from '../types/state';

type Props = {
  jsReady: boolean,
  curUser: ?User,
  game: Game,
  openGame: (gameId: GameId) => void,
  closeGame: (gameId: GameId) => void,
  joinGame: typeof joinGame,
  playerReady: typeof playerReady,
  playerPause: typeof playerPause,
  runGameFrame: typeof runGameFrame,
  drop: typeof drop,
  moveLeft: typeof moveLeft,
  moveRight: typeof moveRight,
  rotate: typeof rotate,
  enableAcceleration: typeof enableAcceleration,
  disableAcceleration: typeof disableAcceleration,
  appendPendingBlocks: typeof appendPendingBlocks,
  ping: typeof ping
};

type LocalState = {
  isWatching: boolean,
  isMobile: boolean
};

class FlatrisGame extends Component<Props, LocalState> {
  state = {
    isWatching: false,
    isMobile: false
  };

  componentDidMount() {
    const { curUser, game, openGame } = this.props;
    openGame(game.id);

    // Start game if playing user returned after possibly being disconnected
    if (isPlayer(game, curUser) && allPlayersReady(game)) {
      this.startGame();
    }

    if (isMobileDevice()) {
      this.setState({
        isMobile: true
      });
    }
  }

  componentDidUpdate(prevProps) {
    const { game: prevGame } = prevProps;
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

  handleSelectP2 = () => {
    // NOTE: This will only be called before a 2nd player arrives under normal
    // circumstances
    this.props.playerPause();
  };

  handleWatch = () => {
    this.setState({
      isWatching: true
    });
  };

  handleMenu = () => {
    this.setState({
      isWatching: false
    });
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
    const { curUser, game } = this.props;
    const hasJoined = isPlayer(game, curUser);

    if (hasJoined) {
      const { ping } = getCurPlayer(game, curUser);
      const now = Date.now();

      // Prevent flooding the network with hysterical pings
      if (!ping || now - ping > 500) {
        this.props.ping();
      }
    }
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
    const { jsReady, curUser, game } = this.props;
    const { isWatching } = this.state;
    const hasJoined = isPlayer(game, curUser);

    // P1 is the current user's player, P2 is the other (in multiplayer games)
    const curPlayer = getCurPlayer(game, curUser);
    const otherPlayer = getOtherPlayer(game, curPlayer);

    if (isWatching) {
      return this.renderScreen(this.renderMenuBtn());
    }

    if (!hasJoined && otherPlayer) {
      return this.renderScreen(
        <GameFull disabled={!jsReady} onWatch={this.handleWatch} />
      );
    }

    if (!curUser) {
      return this.renderScreen(<Auth />);
    }

    if (!hasJoined) {
      return this.renderScreen(
        <JoinGame
          disabled={!jsReady}
          onWatch={this.handleWatch}
          onJoin={this.handleJoin}
        />
      );
    }

    // No screen when current user joined and game is running
    if (allPlayersReady(game)) {
      return null;
    }

    if (curPlayer.status === 'LOST' || curPlayer.status === 'WON') {
      return this.renderScreen(
        <GameOver
          disabled={!jsReady}
          curUser={curUser}
          game={game}
          onRestart={this.handleReady}
        />
      );
    }

    if (!otherPlayer) {
      // curPlayer status is 'PENDING', because if it wouldn've been 'READY'
      // allPlayersReady(game) would've returned true
      return this.renderScreen(
        <NewGame
          disabled={!jsReady}
          jsReady={jsReady}
          gameId={game.id}
          onPlay={this.handleReady}
        />
      );
    }

    if (curPlayer.status === 'READY') {
      return this.renderScreen(
        <WaitingForOther
          disabled={!jsReady}
          curPlayer={curPlayer}
          onPing={this.handlePing}
        />
      );
    }

    // curPlayer.status === 'PENDING'
    return this.renderScreen(
      <GetReady
        disabled={!jsReady}
        otherPlayer={otherPlayer}
        onReady={this.handleReady}
      />
    );
  }

  renderScreen(content: Node) {
    return (
      <div className="screen-container">
        {content}
        <style jsx>{`
          .screen-container {
            position: absolute;
            top: 0;
            bottom: 0;
            left: 0;
            right: calc(100% / 16 * 6);
            background: rgba(236, 240, 241, 0.85);
          }
        `}</style>
      </div>
    );
  }

  renderMenuBtn() {
    return (
      <div className="menu-btn">
        <Button onClick={this.handleMenu}>Menu</Button>
        <style jsx>{`
          .menu-btn {
            position: absolute;
            top: calc(100% / 20 * 17);
            left: calc(100% / 10 * 5);
            width: calc(100% / 10 * 4);
            height: calc(100% / 20 * 2);
            font-size: 1.1em;
            opacity: 0.5;
            transition: opacity 0.5s;
          }

          .menu-btn:hover {
            opacity: 1;
          }
        `}</style>
      </div>
    );
  }

  render() {
    const { jsReady, curUser, game } = this.props;
    const { isMobile } = this.state;
    const hasJoined = isPlayer(game, curUser);
    const curPlayer = getCurPlayer(game, curUser);
    const otherPlayer = getOtherPlayer(game, curPlayer);

    return (
      <GameContainer
        outer={
          isMobile && (
            <FadeIn>
              <LandscapeControls />
            </FadeIn>
          )
        }
      >
        <Quake player1={curPlayer} player2={otherPlayer}>
          <div className="well-container">
            {otherPlayer && (
              <div className="enemy-well">{this.renderWell(otherPlayer)}</div>
            )}
            <Flash player={curPlayer}>{this.renderWell(curPlayer)}</Flash>
          </div>
          {this.renderScreens()}
          <div className="side-container">
            <GamePanel
              curUser={curUser}
              game={game}
              onSelectP2={
                jsReady && hasJoined && !otherPlayer
                  ? this.handleSelectP2
                  : undefined
              }
            />
          </div>
        </Quake>
        <PortraitControls />
        <style jsx>{`
          .well-container {
            position: absolute;
            top: 0;
            bottom: 0;
            left: 0;
            right: calc(100% / 16 * 6);
            background: #ecf0f1;
          }

          .side-container {
            position: absolute;
            top: 0;
            bottom: 0;
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
      </GameContainer>
    );
  }
}

const mapStateToProps = (state: State): $Shape<Props> => ({
  jsReady: state.jsReady,
  curUser: state.curUser,
  game: getCurGame(state)
});

const mapDispatchToProps = {
  runGameFrame
};

const syncActions = {
  joinGame,
  playerReady,
  playerPause,
  drop,
  moveLeft,
  moveRight,
  rotate,
  enableAcceleration,
  disableAcceleration,
  appendPendingBlocks,
  ping
};

export default connect(mapStateToProps, mapDispatchToProps)(
  withSocket(FlatrisGame, syncActions)
);
