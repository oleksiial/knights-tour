import './Controls.css';
import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPlay,
  faStop,
  faChevronCircleLeft,
  faChevronCircleRight,
  faUndo,
  faStepForward,
} from '@fortawesome/free-solid-svg-icons';

const propTypes = {
  isRunning: PropTypes.bool.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,

  run: PropTypes.func.isRequired,
  stop: PropTypes.func.isRequired,
  reset: PropTypes.func.isRequired,
  next: PropTypes.func.isRequired,
  makeNext: PropTypes.func.isRequired,
  undo: PropTypes.func.isRequired,
  redo: PropTypes.func.isRequired,
};

const Controls = ({
  isRunning, width, height, run, stop, reset, next, makeNext, undo, redo,
}) => (
  <div className="controls">
    <button className="control" type="button" onClick={reset}>
      <FontAwesomeIcon icon={faUndo} />
    </button>
    <button className="control" type="button" onClick={makeNext}>
      <FontAwesomeIcon icon={faStepForward} />
    </button>
    {isRunning ? (
      <button className="control" type="button" onClick={stop}>
        <FontAwesomeIcon icon={faStop} />
      </button>
    ) : (
      <button className="control" type="button" onClick={run}>
        <FontAwesomeIcon icon={faPlay} />
      </button>
    )}
    <button className="control" type="button" onClick={undo}>
      <FontAwesomeIcon icon={faChevronCircleLeft} />
    </button>
    <button className="control" type="button" onClick={redo}>
      <FontAwesomeIcon icon={faChevronCircleRight} />
    </button>
  </div>
);

Controls.propTypes = propTypes;

export default Controls;
