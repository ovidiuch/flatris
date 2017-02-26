import React from 'react';
import { connect } from 'react-redux';
import FlatrisGame from './components/FlatrisGame.jsx';
import FlatrisStatePreview from './components/FlatrisStatePreview.jsx';

import './App.css';

const App = ({ styles }) => {
  return (
    <div>
      <div className="game" style={styles.game}>
        <FlatrisGame />
      </div>
      <div className="preview" style={styles.preview}>
        <FlatrisStatePreview />
      </div>
    </div>
  );
};

const stretch = {
  position: 'absolute',
  top: 0,
  bottom: 0,
  left: 0,
  right: 0
};

const { round, max } = Math;

const getStyles = ({ height, landscape, root }) => {
  if (landscape) {
    return {
      game: {
        ...stretch,
        right: '50%',
        paddingTop: max(0, round(height - root.height))
      },
      preview: {
        ...stretch,
        left: '50%'
      }
    };
  }

  return {
    game: {},
    preview: {}
  };
};

export default connect(({ layout }) => {
  return {
    styles: getStyles(layout)
  };
})(App);
