import './App.css';
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import {
  next, undo, redo, reset,
} from '../../redux/actions/core';

import Canvas from '../Canvas';
import Controls from '../Controls';

import useWindowSize from '../../hooks/useWindowSize';

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
  reset: PropTypes.func.isRequired,
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
  reset,
  next,
  undo,
  redo,
}) => {
  const windowSize = useWindowSize();
  const slicedHistory = history.slice(0, history.length - currentOffset);
  const squaresLeft = width * height - slicedHistory.length;
  const hover = window.matchMedia('(any-hover: hover)').matches;
  return (
    <div className="container">
      <div className="app">
        <header className="header">
          <h1>Knight&apos;s tour</h1>
          <p>{squaresLeft ? `${squaresLeft} squares left` : 'Well done!'}</p>
        </header>
        <div className="field">
          <Canvas
            width={width}
            height={height}
            history={slicedHistory}
            windowSize={hover ? Math.min(480, windowSize) : windowSize}
            onClick={next}
          />
        </div>
        <Controls
          isRunning={isRunning}
          width={width}
          height={height}
          start={start}
          stop={stop}
          reset={reset}
          next={next}
          undo={undo}
          redo={redo}
        />
      </div>
    </div>
  );
};

App.propTypes = propTypes;

const mapStateToProps = state => ({
  ...state.core,
});

const mapDispatchToProps = dispatch => ({
  start: () => dispatch({ type: 'RUN' }),
  stop: () => dispatch({ type: 'STOP' }),
  reset: () => dispatch(reset()),
  next: (i, j) => dispatch(next(i, j)),
  undo: () => dispatch(undo()),
  redo: () => dispatch(redo()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);
