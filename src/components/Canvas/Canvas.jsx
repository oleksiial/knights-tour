import './Canvas.css';
import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import knight from './knight';

const propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  history: PropTypes.arrayOf(
    PropTypes.shape({
      i: PropTypes.number.isRequired,
      j: PropTypes.number.isRequired,
    }),
  ).isRequired,
  windowSize: PropTypes.number.isRequired,

  onClick: PropTypes.func.isRequired,
};

const Canvas = ({
  width, height, history, windowSize, onClick,
}) => {
  const cellSize = windowSize / width;
  const ref = useRef();
  const clearCanvas = (ctx) => {
    ctx.fillStyle = '#CCC';
    ctx.fillRect(0, 0, cellSize * width, cellSize * height);
  };
  const colorBoard = (ctx) => {
    const dark = '#985123';
    const light = '#d8a35a';

    for (let i = 0; i < height; ++i) {
      for (let j = 0; j < width; ++j) {
        ctx.fillStyle = (i + j) % 2 ? dark : light;
        ctx.fillRect(j * cellSize, i * cellSize, cellSize, cellSize);
      }
    }
  };
  const markVisitedSquares = (ctx) => {
    ctx.fillStyle = 'rgba(50, 255, 50, 0.5)';
    history.slice(0, -1).forEach((entry) => {
      ctx.fillRect(entry.j * cellSize, entry.i * cellSize, cellSize, cellSize);
    });
  };
  const markCurrentSquare = (ctx) => {
    ctx.fillStyle = 'rgba(255, 255, 50, 0.5)';
    const currentPos = history[history.length - 1];
    if (currentPos) {
      ctx.fillRect(currentPos.j * cellSize, currentPos.i * cellSize, cellSize, cellSize);
      ctx.drawImage(knight, currentPos.j * cellSize, currentPos.i * cellSize, cellSize, cellSize);
    }
  };
  const drawLines = (ctx) => {
    ctx.strokeStyle = 'rgba(20, 20, 20, 0.7)';
    ctx.beginPath();
    ctx.moveTo(history[0].j * cellSize + cellSize / 2, history[0].i * cellSize + cellSize / 2);
    history.forEach((e) => {
      ctx.lineTo(e.j * cellSize + cellSize / 2, e.i * cellSize + cellSize / 2);
    });
    ctx.stroke();
  };
  const handleClick = (e) => {
    // clientX/clientY like screenX/screenY use length from screen
    // but pageX/pageY use length from the board top
    const i = ((e.pageY - ref.current.offsetTop) / cellSize) | 0;
    const j = ((e.pageX - ref.current.offsetLeft) / cellSize) | 0;
    onClick(i, j);
  };

  useEffect(() => {
    const ctx = ref.current.getContext('2d');
    clearCanvas(ctx);
    colorBoard(ctx);
    if (history.length > 0) {
      drawLines(ctx);
      markVisitedSquares(ctx);
      markCurrentSquare(ctx);
    }
  });

  return (
    <canvas ref={ref} width={width * cellSize} height={height * cellSize} onClick={handleClick} />
  );
};

Canvas.propTypes = propTypes;

export default Canvas;
