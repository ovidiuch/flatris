// @flow

import React, { Component } from 'react';

import type { Stats as StatsType } from '../types/state';

type Props = {
  stats: StatsType
};

type LocalState = {
  lastUpdated: number,
  statsDiff: StatsType
};

class Stats extends Component<Props, LocalState> {
  state = {
    lastUpdated: Date.now(),
    statsDiff: {
      actionAcc: 0,
      actionLeft: 0,
      actionRight: 0,
      actionRotate: 0,
      games: 0,
      lines: 0,
      seconds: 0
    }
  };

  componentDidUpdate({ stats: prevStats }: Props) {
    const { stats } = this.props;

    if (stats !== prevStats) {
      this.setState({
        statsDiff: {
          // Thank you Flow for making my life B O R I N G!
          actionAcc: stats.actionAcc - prevStats.actionAcc,
          actionLeft: stats.actionLeft - prevStats.actionLeft,
          actionRight: stats.actionRight - prevStats.actionRight,
          actionRotate: stats.actionRotate - prevStats.actionRotate,
          games: stats.games - prevStats.games,
          lines: stats.lines - prevStats.lines,
          seconds: stats.seconds - prevStats.seconds
        },
        lastUpdated: Date.now()
      });
    }
  }

  render() {
    return (
      <div className="stats">
        <p>{this.renderCount('games')} Flatris games played.</p>
        <p>
          {this.renderCount('actionLeft')} left and{' '}
          {this.renderCount('actionRight')} right moves.{' '}
          {this.renderCount('actionAcc')} drops and{' '}
          {this.renderCount('actionRotate')} rotations.
        </p>
        <p>
          {this.renderCount('lines')} lines cleared in{' '}
          {this.renderCount('seconds')} seconds of play time.
        </p>
        <style jsx>{`
          .stats {
            margin: 20px;
            overflow: hidden;
            background: #ecf0f1;
            color: #34495f;
            font-size: 16px;
          }

          p {
            margin: 15px 20px;
            line-height: 30px;
          }
        `}</style>
      </div>
    );
  }

  renderCount(stat: $Keys<StatsType>) {
    const { stats } = this.props;
    const { lastUpdated, statsDiff } = this.state;
    const diff = statsDiff[stat];

    return (
      <span className="count">
        <span className="total">{stats[stat]}</span>
        {diff > 0 && (
          <span className="diff" key={lastUpdated}>
            {diff}
          </span>
        )}
        <style jsx>{`
          .count {
            display: inline-block;
            position: relative;
          }

          .total,
          .diff {
            display: block;
            padding: 0 5px;
            border-radius: 3px;
            line-height: 24px;
          }

          .total {
            background: #fff;
          }

          .diff {
            position: absolute;
            top: 0;
            right: 0;
            background: #3993d0;
            color: #fff;
            animation: 2s fadeUp forwards;
          }

          @keyframes fadeUp {
            0% {
              opacity: 1;
              transform: translate(0, 0);
            }
            100% {
              opacity: 0;
              transform: translate(0, -100%);
            }
          }
        `}</style>
      </span>
    );
  }
}

export default Stats;
