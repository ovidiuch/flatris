// @flow

import React, { Component } from 'react';

const SHAPES = {
  I: [[0, 0, 0, 0], [1, 1, 1, 1], [0, 0, 0, 0], [0, 0, 0, 0]],
  O: [[1, 1], [1, 1]],
  T: [[0, 1, 0], [1, 1, 1], [0, 0, 0]],
  J: [[1, 0, 0], [1, 1, 1], [0, 0, 0]],
  L: [[0, 0, 1], [1, 1, 1], [0, 0, 0]],
  S: [[0, 1, 1], [1, 1, 0], [0, 0, 0]],
  Z: [[1, 1, 0], [0, 1, 1], [0, 0, 0]]
};

const { round, random } = Math;

const range = [...Array(4).keys()];

type Shape = $Keys<typeof SHAPES>;

type State = {
  currShape: Shape
};

export default class Loading extends Component<{}, State> {
  state = {
    currShape: 'S'
  };

  timeoutId: ?TimeoutID;

  componentDidMount() {
    this.scheduleShapeChange();
  }

  componentWillUnmount() {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }
  }

  changeShape = () => {
    const allShapes = Object.keys(SHAPES);
    const otherShapes = allShapes.filter(s => s !== this.state.currShape);
    const currShape = otherShapes[round(random() * (otherShapes.length - 1))];

    this.setState({
      currShape
    });

    this.scheduleShapeChange();
  };

  scheduleShapeChange() {
    this.timeoutId = setTimeout(this.changeShape, 1000);
  }

  render() {
    const { currShape } = this.state;
    const shapeGrid = SHAPES[currShape];

    return (
      <div className="root">
        <div className="loading">
          {range.map(i =>
            range.map(j => (
              <span
                key={`${i}-${j}`}
                className={shapeGrid[i] && shapeGrid[i][j] ? 'cell on' : 'cell'}
              />
            ))
          )}
        </div>
        <style jsx>{`
          .root {
            position: absolute;
            top: 0;
            bottom: 0;
            left: 0;
            right: 0;
          }
          .loading {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-37.5%, -25%);
            width: 400px;
            height: 400px;
          }
          .cell {
            float: left;
            width: 25%;
            height: 25%;
            background: #34495f;
            opacity: 0;
            transform: scale(0.75);
            transition: opacity 0.5s, transform 0.5s;
          }
          .on {
            opacity: 1;
            transform: scale(1);
          }
        `}</style>
      </div>
    );
  }
}
