/* global window */
// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { throttle } from 'lodash';
import { UP, DOWN, LEFT, RIGHT, SPACE, KEY_DELAY } from '../../constants/keys';
import { GAME_INACTIVE_TIMEOUT } from 'shared/constants/timeouts';
import {
  isPlayer,
  getPlayer,
  getCurPlayer,
  getOtherPlayer,
  allPlayersReady
} from 'shared/reducers/game';
import { getCurGame } from '../../reducers/cur-game';
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
} from '../../actions/game';
import { runGameFrame, cancelGameFrame } from '../../actions/game-frame';
import { withSocket } from '../socket/SocketConnect';
import { isMobileDevice } from '../../utils/events';
import GameContainer from '../GameContainer';
import Button from '../Button';
import GamePreview from '../GamePreview';
import PortraitControls from '../controls/PortraitControls';
import LandscapeControls from '../controls/LandscapeControls';
import FadeIn from '../effects/FadeIn';
import Auth from '../screens/Auth';
import NewGame from '../screens/NewGame';
import Invite from '../screens/Invite';
import JoinGame from '../screens/JoinGame';
import GameFull from '../screens/GameFull';
import GetReady from '../screens/GetReady';
import WaitingForOther from '../screens/WaitingForOther';
import GameOver from '../screens/GameOver';

import type { Node } from 'react';
import type { User, GameId, Game, Backfills, State } from 'shared/types/state';
import type { RoomId } from 'shared/types/api';

type Props = {
  jsReady: boolean,
  curUser: ?User,
  game: Game,
  backfills: Backfills,
  subscribe: (roomId: RoomId) => mixed,
  keepGameAlive: (gameId: GameId) => mixed,
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

// NOTE: This component will crash if state.curGame isn't populated!
class FlatrisGame extends Component<Props, LocalState> {
  state = {
    isWatching: false,
    isMobile: false
  };

  keepAliveTimeout: ?TimeoutID;

  componentDidMount() {
    const { curUser, game, subscribe } = this.props;

    // Subscribe to socket messages for this game
    subscribe(game.id);

    // Start game if playing user returned after possibly being disconnected
    if (isPlayer(game, curUser) && allPlayersReady(game)) {
      this.startGame();
    }

    if (isMobileDevice()) {
      this.setState({
        isMobile: true
      });
    }

    this.keepAlive();
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
    this.cancelKeepAlive();
  }

  keepAlive = () => {
    const { game, keepGameAlive } = this.props;
    keepGameAlive(game.id);

    const timeout = GAME_INACTIVE_TIMEOUT - 1000;
    this.keepAliveTimeout = setTimeout(this.keepAlive, timeout);
  };

  cancelKeepAlive() {
    if (this.keepAliveTimeout) {
      clearTimeout(this.keepAliveTimeout);
    }
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
    const { curUser, game, playerPause } = this.props;
    const { status } = getCurPlayer(game, curUser);

    if (game.players.length > 1) {
      throw new Error('Game already has two players');
    }

    // READY status for a solo player means the game is running
    // Is status is LOST the player will see the invite screen anyway
    if (status === 'READY') {
      playerPause();
    }
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

  // This has multiple benefits, in this order:
  // 1. Prevent flooding the network with too many actions per second
  // 2. Provide level playing field between users with different keyboard config
  // 3. Prevent client pref degradation due to too many actions per second
  tEnableAcceleration = throttle(this.props.enableAcceleration, KEY_DELAY);
  tRotate = throttle(this.props.rotate, KEY_DELAY);
  tMoveLeft = throttle(this.props.moveLeft, KEY_DELAY);
  tMoveRight = throttle(this.props.moveRight, KEY_DELAY);

  handleKeyDown = e => {
    // Prevent page from scrolling when pressing arrow keys
    if ([UP, DOWN, LEFT, RIGHT, SPACE].indexOf(e.keyCode) !== -1) {
      e.preventDefault();
    }

    switch (e.keyCode) {
      case DOWN:
      case SPACE:
        this.tRotate.cancel();
        this.tMoveLeft.cancel();
        this.tMoveRight.cancel();
        this.tEnableAcceleration();
        break;
      case UP:
        this.tEnableAcceleration.cancel();
        this.tMoveLeft.cancel();
        this.tMoveRight.cancel();
        this.tRotate();
        break;
      case LEFT:
        this.tEnableAcceleration.cancel();
        this.tRotate.cancel();
        this.tMoveRight.cancel();
        this.tMoveLeft();
        break;
      case RIGHT:
        this.tEnableAcceleration.cancel();
        this.tRotate.cancel();
        this.tMoveLeft.cancel();
        this.tMoveRight();
        break;
      default:
    }
  };

  handleKeyUp = e => {
    if (e.keyCode === DOWN) {
      this.tEnableAcceleration.cancel();
      this.tRotate.cancel();
      this.tMoveLeft.cancel();
      this.tMoveRight.cancel();

      const { disableAcceleration } = this.props;
      disableAcceleration();
    }
  };

  renderScreens() {
    const { jsReady, curUser, game, backfills } = this.props;
    const { isWatching } = this.state;
    const hasJoined = isPlayer(game, curUser);
    const disabled = Boolean(!jsReady || backfills[game.id]);

    // P1 is the current user's player, P2 is the other (in multiplayer games)
    const curPlayer = getCurPlayer(game, curUser);
    const otherPlayer = getOtherPlayer(game, curPlayer);

    if (isWatching) {
      return this.renderScreen(this.renderMenuBtn(), false);
    }

    if (!hasJoined && otherPlayer) {
      return this.renderScreen(
        <GameFull disabled={disabled} onWatch={this.handleWatch} />
      );
    }

    if (!curUser) {
      return this.renderScreen(<Auth />);
    }

    if (!hasJoined) {
      return this.renderScreen(
        <JoinGame
          disabled={disabled}
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
          disabled={disabled}
          curUser={curUser}
          game={game}
          onRestart={this.handleReady}
        />
      );
    }

    if (!otherPlayer) {
      if (curPlayer.status === 'PAUSE') {
        return this.renderScreen(
          <Invite
            disabled={disabled}
            gameId={game.id}
            onPlay={this.handleReady}
          />
        );
      }

      // curPlayer status is 'PENDING', because if it wouldn've been 'READY'
      // allPlayersReady(game) would've returned true
      return this.renderScreen(
        <NewGame
          disabled={disabled}
          gameId={game.id}
          onPlay={this.handleReady}
        />
      );
    }

    if (curPlayer.status === 'READY') {
      return this.renderScreen(
        <WaitingForOther
          disabled={disabled}
          curPlayer={curPlayer}
          onPing={this.handlePing}
        />
      );
    }

    // curPlayer.status === 'PENDING'
    return this.renderScreen(
      <GetReady
        disabled={disabled}
        otherPlayer={otherPlayer}
        onReady={this.handleReady}
      />
    );
  }

  renderScreen(content: Node, showOverlay: boolean = true) {
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
            background: ${showOverlay
              ? 'rgba(236, 240, 241, 0.85)'
              : 'transparent'};
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
        <GamePreview
          curUser={curUser}
          game={game}
          screen={this.renderScreens()}
          onSelectP2={
            // I know, right...
            // We only want to enable this on READY state (when game is running
            // for solo player), because in other states (new game and game
            // over) we already show the invite screen.
            jsReady && hasJoined && curPlayer.status === 'READY' && !otherPlayer
              ? this.handleSelectP2
              : undefined
          }
          showFooter
        />
        <PortraitControls />
      </GameContainer>
    );
  }
}

const mapStateToProps = (state: State): $Shape<Props> => {
  const { jsReady, curUser, backfills } = state;

  return {
    jsReady: jsReady,
    curUser: curUser,
    game: getCurGame(state),
    backfills
  };
};

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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withSocket(FlatrisGame, syncActions));
