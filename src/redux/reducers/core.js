import {
  SET_WIDTH, SET_HEIGHT, RUN, STOP, UNDO, REDO, NEXT,
} from '../actions/core';

const initialState = {
  isRunning: false,
  width: 8,
  height: 8,
  history: [],
  currentOffset: 0,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case RUN:
      return { ...state, isRunning: true };
    case STOP:
      return { ...state, isRunning: false };
    case SET_WIDTH:
      return { ...state, width: action.payload };
    case SET_HEIGHT:
      return { ...state, width: action.payload };
    case UNDO:
      return {
        ...state,
        currentOffset: Math.min(state.history.length, state.currentOffset + 1),
      };
    case REDO:
      return { ...state, currentOffset: Math.max(0, state.currentOffset - 1) };
    case NEXT:
      return {
        ...state,
        currentOffset: 0,
        history: [
          ...state.history.slice(0, state.history.length - state.currentOffset),
          { i: action.payload.i, j: action.payload.j },
        ],
      };
    default:
      return state;
  }
}
