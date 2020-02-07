// @flow

import React, { Component } from 'react';
import withRedux from 'next-redux-wrapper';
import { createStore } from '../store';
import { addCurUserToState, getDailyStats } from '../utils/api';
import Layout from '../components/Layout';

import type { DailyStats } from 'shared/types/state';

type Props = {
  days: DailyStats
};

class StatsPage extends Component<Props> {
  static async getInitialProps({ req, store }) {
    // Food for thought: How to not duplicate this on every page
    if (req) {
      await addCurUserToState(req, store);
    }

    const { days } = await getDailyStats();
    return { days };
  }

  render() {
    const { days } = this.props;
    const sortedDays = Object.keys(days).sort((a, b) => b.localeCompare(a));
    const maxGames = sortedDays.reduce((max, d) => Math.max(max, days[d]), 0);
    return (
      <Layout>
        <div className="header">
          <div>Day</div>
          <div>Games played</div>
        </div>
        {sortedDays.map(day => {
          const games = days[day];
          const percentage = Math.round((games / maxGames) * 100);
          const date = new Date(day);
          return (
            <div key={day}>
              <div className="dayContent">
                <div>{date.toDateString()}</div>
                <div>
                  <strong>{games}</strong>
                </div>
              </div>
              <div className="dayBar">
                <div
                  className="dayProgress"
                  style={{ width: `${percentage}%` }}
                />
              </div>
            </div>
          );
        })}
        <style jsx>{`
          .header {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            background: #ecf0f1;
            padding: 10px 20px;
            color: #34495f;
          }
          .dayContent {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            background: #fff;
            padding: 10px 20px;
            color: #34495f;
          }
          .dayBar {
            height: 6px;
            background: #ecf0f1;
          }
          .dayProgress {
            height: 6px;
            background: rgb(149, 196, 61);
          }
        `}</style>
      </Layout>
    );
  }
}

export default withRedux(createStore)(StatsPage);
