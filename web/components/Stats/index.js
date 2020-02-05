// @flow

import React, { Component } from 'react';

import type { Stats as StatsType } from 'shared/types/state';

type Props = {
  stats: StatsType
};

type LocalState = {
  statsDiff: {
    [stat: $Keys<StatsType>]: [number, number] // [diff, updatedAt]
  }
};

class Stats extends Component<Props, LocalState> {
  state = {
    statsDiff: {}
  };

  componentDidUpdate({ stats: prevStats }: Props) {
    const { stats } = this.props;

    if (stats !== prevStats) {
      let statsDiff = this.state.statsDiff;

      Object.keys(stats).forEach((stat: $Keys<StatsType>) => {
        const diff = stats[stat] - prevStats[stat];

        if (diff > 0) {
          statsDiff = {
            ...statsDiff,
            [stat]: [diff, Date.now()]
          };
        }
      });

      this.setState({
        statsDiff
      });
    }
  }

  render() {
    return (
      <div className="stats">
        <p>
          {this.renderCount('games')} games {this.renderCount('seconds')}{' '}
          seconds
        </p>
        <p>
          {this.renderCount('actionLeft')} lefts{' '}
          {this.renderCount('actionRight')} rights{' '}
          {this.renderCount('actionAcc')} drops{' '}
          {this.renderCount('actionRotate')} rotations
        </p>
        <p>{this.renderCount('lines')} lines cleared</p>
        <style jsx>{`
          .stats {
            overflow: hidden;
            background: #ecf0f1;
            color: #34495f;
            font-size: 16px;
          }

          p {
            margin: 10px 20px;
            line-height: 30px;
          }
        `}</style>
      </div>
    );
  }

  renderCount(stat: $Keys<StatsType>) {
    const { stats } = this.props;
    const { statsDiff } = this.state;
    const diff = statsDiff[stat];

    return (
      <span className="count">
        <span className="total">{getSpacedNumber(stats[stat])}</span>
        {diff && (
          <span className="diff" key={`${stat}-${diff[1]}`}>
            {diff[0]}
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

function getSpacedNumber(nr: number) {
  return nr.toLocaleString('en-EN').replace(/,/g, ' ');
}
