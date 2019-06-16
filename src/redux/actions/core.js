export const SET_WIDTH = 'SET_WIDTH';
export const SET_HEIGHT = 'SET_HEIGHT';
export const RUN = 'RUN';
export const STOP = 'STOP';
export const RESET = 'RESET';

export const UNDO = 'UNDO';
export const REDO = 'REDO';

export const NEXT = 'NEXT';

const getDirections = (i, j) => [
  [i + 1, j + 2],
  [i + 1, j - 2],
  [i - 1, j + 2],
  [i - 1, j - 2],
  [i + 2, j + 1],
  [i + 2, j - 1],
  [i - 2, j + 1],
  [i - 2, j - 1],
];

const insideBoard = (d, width, height) => d[0] >= 0 && d[0] < height && d[1] >= 0 && d[1] < width;
const passed = (d, history) => history.some(e => e.i === d[0] && e.j === d[1]);
const nextMoveExists = (currentPos, width, height, history) => {
  const directions = getDirections(currentPos.i, currentPos.j);
  return directions.some(d => insideBoard(d, width, height) && !passed(d, history));
};

export const makeNext = () => (dispatch, getState) => {
  const {
    width, height, history, currentOffset,
  } = getState().core;
  const slicedHistory = history.slice(0, history.length - currentOffset);
  const currentPos = slicedHistory[slicedHistory.length - 1];
  if (!currentPos) {
    return;
  }

  const field = Array(height)
    .fill(null)
    .map(() => Array(width).fill(null))
    .map((sub, i) => sub.map((v, j) => {
      if (passed([i, j], slicedHistory)) {
        return 9;
      }

      const directions = getDirections(i, j);
      return directions.reduce(
        (acc, d) => (insideBoard(d, width, height) && !passed(d, slicedHistory) ? acc + 1 : acc),
        0,
      );
    }));

  const directions = getDirections(currentPos.i, currentPos.j).filter(
    d => insideBoard(d, width, height) && !passed(d, slicedHistory),
  );

  if (directions.length) {
    const mappedDirections = directions.map(d => ({ i: d[0], j: d[1], value: field[d[0]][d[1]] }));
    mappedDirections.sort((a, b) => a.value - b.value);
    const mins = mappedDirections.filter(d => d.value === mappedDirections[0].value);
    const min = mins[Math.floor(Math.random() * mins.length)];
    dispatch({ type: NEXT, payload: { i: min.i, j: min.j } });
  }
};

let timer = null;
export const stop = () => {
  clearInterval(timer);
  return { type: STOP };
};

export const run = () => (dispatch, getState) => {
  dispatch({ type: RUN });
  timer = setInterval(() => {
    const {
      width, height, history, currentOffset,
    } = getState().core;
    const slicedHistory = history.slice(0, history.length - currentOffset);
    const currentPos = slicedHistory[slicedHistory.length - 1];
    if (nextMoveExists(currentPos, width, height, slicedHistory)) {
      dispatch(makeNext());
    } else {
      dispatch(stop());
    }
  }, 150);
};

export const setWidth = width => ({ type: SET_WIDTH, payload: width });
export const setHeight = height => ({ type: SET_HEIGHT, payload: height });

export const reset = () => ({ type: RESET });

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

  const directions = getDirections(currentPos.i, currentPos.j);
  const isLegal = directions.some(d => d[0] === i && d[1] === j);
  const notPassed = slicedHistory.every(e => e.i !== i || e.j !== j);

  if (isLegal && notPassed) {
    dispatch({ type: NEXT, payload: { i, j } });
  }
};
