export const SET_WIDTH = 'SET_WIDTH';
export const SET_HEIGHT = 'SET_HEIGHT';
export const RUN = 'RUN';
export const STOP = 'STOP';

export const UNDO = 'UNDO';
export const REDO = 'REDO';

export const NEXT = 'NEXT';

export const setWidth = width => ({ type: SET_WIDTH, payload: width });
export const setHeight = height => ({ type: SET_HEIGHT, payload: height });
export const run = () => ({ type: RUN });
export const stop = () => ({ type: STOP });

export const undo = () => ({ type: UNDO });
export const redo = () => ({ type: REDO });

export const next = (i, j) => (dispatch, getState) => {
  const { history, currentOffset } = getState().core;
  const slicedHistory = history.slice(0, history.length - currentOffset);
  const currentPos = slicedHistory[slicedHistory.length - 1];
  if (!currentPos) {
    dispatch({ type: NEXT, payload: { i, j } });
    return;
  }

  const directions = [
    [currentPos.i + 1, currentPos.j + 2],
    [currentPos.i + 1, currentPos.j - 2],
    [currentPos.i - 1, currentPos.j + 2],
    [currentPos.i - 1, currentPos.j - 2],
    [currentPos.i + 2, currentPos.j + 1],
    [currentPos.i + 2, currentPos.j - 1],
    [currentPos.i - 2, currentPos.j + 1],
    [currentPos.i - 2, currentPos.j - 1],
  ];

  const isLegal = directions.some(d => d[0] === i && d[1] === j);
  const notPassed = slicedHistory.every(e => e.i !== i || e.j !== j);

  if (isLegal && notPassed) {
    dispatch({ type: NEXT, payload: { i, j } });
  }
};
