import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
const Cell = ({ el }) => {
  const { headCoords, newPieceCoords, snakeBody } = useSelector((state) => state.snake);
  const body = () => {
    for (let i = 0; i < snakeBody.length - 1; i++) {
      if (snakeBody[i][0] === el[0] && snakeBody[i][1] === el[1]) {
        return true;
      }
    }
    return false;
  };

  let className = null;
  if (headCoords[0] === el[0] && headCoords[1] === el[1]) {
    className = 'snake';
  } else if (newPieceCoords[0] === el[0] && newPieceCoords[1] === el[1]) {
    className = 'newPiece';
  } else if (body()) {
    className = 'snake';
  } else className = '';
  return <div className={`${className}`}></div>;
};

export default Cell;
