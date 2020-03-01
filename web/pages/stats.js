// @flow

import React, { Component, Fragment } from 'react';
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
    const { days: counts } = this.props;
    const ascDays = Object.keys(counts).sort((a, b) => a.localeCompare(b));
    const descWeeks = getDescWeeks(ascDays, counts);
    const dayMax = ascDays.reduce((max, d) => Math.max(max, counts[d]), 0);
    const weekMax = descWeeks.reduce((max, w) => Math.max(max, w.total), 0);

    return (
      <Layout>
        <div className="header">
          <div>Day</div>
          <div>Games played</div>
        </div>
        {descWeeks.map((week, weekIndex) => {
          const firstDay = week.days[0];
          const lastDay = week.days[week.days.length - 1];
          const percentage = Math.round((week.total / weekMax) * 100);
          return (
            <Fragment key={`${firstDay}-${lastDay}`}>
              <div style={{ opacity: weekIndex > 0 ? 1 : 0.5 }}>
                <div className="dayContent">
                  <div>
                    {getWeekDayDate(firstDay)} - {getWeekDayDate(lastDay)}
                  </div>
                  <div>
                    <strong>{week.total}</strong>
                  </div>
                </div>
                <div className="progressBar">
                  <div
                    className="weekProgress"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>
              {week.days.map(day => {
                const games = counts[day];
                const percentage = Math.round((games / dayMax) * 100);
                const date = new Date(day);
                return (
                  <div key={day}>
                    <div className="dayContent">
                      <div>{date.toDateString()}</div>
                      <div>
                        <strong>{games}</strong>
                      </div>
                    </div>
                    <div className="progressBar">
                      <div
                        className="dayProgress"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </Fragment>
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
          .progressBar {
            height: 6px;
            background: #ecf0f1;
          }
          .dayProgress {
            height: 6px;
            background: rgb(149, 196, 61);
          }
          .weekProgress {
            height: 6px;
            background: rgb(57, 147, 208);
          }
        `}</style>
      </Layout>
    );
  }
}

export default withRedux(createStore)(StatsPage);

function getDescWeeks(ascDays, counts) {
  const weeks = [];
  ascDays.forEach(day => {
    const isMonday = new Date(day).getDay() === 1;
    if (isMonday || weeks.length === 0) {
      weeks.unshift({ total: counts[day], days: [day] });
    } else {
      const curWeek = weeks[0];
      curWeek.total += counts[day];
      curWeek.days.push(day);
    }
  });
  return weeks;
}

function getWeekDayDate(day) {
  const date = new Date(day);
  // Remove week day
  return date
    .toDateString()
    .split(' ')
    .slice(1)
    .join(' ');
}
