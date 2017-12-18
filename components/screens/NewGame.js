// TODO: Convert to Flow
import { func } from 'prop-types';
import React, { Component } from 'react';
import Button from '../Button';

const oneToEight = [...Array(8).keys()].map(num => num + 1);

/**
 * Screen for creating a new game
 */
export default class NewGame extends Component {
  state = {
    numPlayers: 8
  };

  createPlayerNumSelectHandler = numPlayers => () => {
    this.setState({
      numPlayers
    });
  };

  handleNext = () => {
    this.props.onNext(this.state.numPlayers);
  };

  render() {
    const { onBack } = this.props;

    return (
      <div className="screen">
        <h2 className="title">New game...</h2>
        <p className="message">
          Choose the max <strong>number of players</strong> for this game
        </p>
        <div className="player-num-selector">
          {oneToEight.map(num => (
            <div
              key={num}
              className={
                num === this.state.numPlayers
                  ? 'player-num player-num-selected'
                  : 'player-num'
              }
              onClick={this.createPlayerNumSelectHandler(num)}
            >
              {num}
            </div>
          ))}
        </div>
        <div className="actions">
          <div className="button">
            <Button bgColor="#fff" color="#34495f" onClick={onBack}>
              Back
            </Button>
          </div>
          <div className="button" onClick={this.handleNext}>
            <Button>Next</Button>
          </div>
        </div>
        <style jsx>{`
          .screen {
            position: absolute;
            top: 0;
            bottom: 0;
            left: calc(100% / 10);
            right: calc(100% / 10);
            color: #34495f;
            font-size: 1.1em;
          }

          .title {
            position: absolute;
            top: calc(100% / 20);
            margin: 0;
            padding: 0;
            font-size: 2.2em;
            line-height: 2.1em;
            font-weight: 600;
            white-space: nowrap;
            opacity: 0.7;
          }

          .message {
            position: absolute;
            top: calc(100% / 20 * 5);
            margin: 0;
            padding: 0;
            font-size: 1.2em;
            line-height: 1.3em;
          }

          .player-num-selector {
            position: absolute;
            top: calc(100% / 20 * 9);
            left: 0;
            right: 0;
            height: calc(100% / 20 * 4);
          }

          .player-num {
            float: left;
            width: 25%;
            height: 50%;
            color: #34495f;
            font-size: 2em;
            font-weight: 400;
            line-height: 1.5em;
            text-align: center;
            cursor: pointer;
            user-select: none;
          }

          .player-num-selected {
            border-radius: 100%;
            background: #34495f;
            color: #ecf0f1;
            cursor: default;
          }

          .actions {
            position: absolute;
            top: calc(100% / 20 * 16);
            left: 0;
            right: 0;
            height: calc(100% / 20 * 2);
          }

          .button {
            position: relative;
            float: left;
            width: 50%;
            height: 100%;
          }
        `}</style>
      </div>
    );
  }
}

NewGame.propTypes = {
  onBack: func.isRequired,
  onNext: func.isRequired
};
