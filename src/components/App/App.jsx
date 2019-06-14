import './App.css';
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { next, undo, redo } from '../../redux/actions/core';

import Canvas from '../Canvas';

const propTypes = {
  isRunning: PropTypes.bool.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  currentOffset: PropTypes.number.isRequired,
  history: PropTypes.arrayOf(
    PropTypes.shape({
      i: PropTypes.number.isRequired,
      j: PropTypes.number.isRequired,
    }),
  ).isRequired,

  start: PropTypes.func.isRequired,
  stop: PropTypes.func.isRequired,
  next: PropTypes.func.isRequired,
  undo: PropTypes.func.isRequired,
  redo: PropTypes.func.isRequired,
};

const App = ({
  isRunning,
  width,
  height,
  history,
  currentOffset,
  start,
  stop,
  next,
  undo,
  redo,
}) => (
  <div className="app">
    <div className="controls">
      <button type="button" onClick={undo}>
        undo
      </button>
      <button type="button" onClick={redo}>
        redo
      </button>
    </div>
    <div className="field">
      <Canvas
        width={width}
        height={height}
        history={history.slice(0, history.length - currentOffset)}
        onClick={next}
      />
    </div>
  </div>
);

App.propTypes = propTypes;

const mapStateToProps = state => ({
  ...state.core,
});

const mapDispatchToProps = dispatch => ({
  start: () => dispatch({ type: 'RUN' }),
  stop: () => dispatch({ type: 'STOP' }),
  next: (i, j) => dispatch(next(i, j)),
  undo: () => dispatch(undo()),
  redo: () => dispatch(redo()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);
