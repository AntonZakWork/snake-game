import React, { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './Game.scss';
import Cell from '../Cell';

import {
  increaseScore,
  keyAction,
  setDirection,
  setDivCoordinates,
  setHeadCoords,
  setPieceCoords,
} from '../Store/snakeSlice';

const Game = () => {
  const field = useRef();
  const dispatch = useDispatch();
  const {
    width,
    height,
    divCoordinates,
    headCoords,
    newPieceCoords,
    score,
    snakeBody,
    snakeSpeed,
    pause,
  } = useSelector((state) => state.snake);

  useEffect(() => {
    dispatch(setDivCoordinates());
    field.current.focus();
    dispatch(setPieceCoords());
  }, []);

  useEffect(() => {
    if (pause) return;
    if (headCoords[0] === newPieceCoords[0] && headCoords[1] === newPieceCoords[1]) {
      dispatch(setPieceCoords());
      dispatch(increaseScore());
    }
    const timeout = setTimeout(() => dispatch(setHeadCoords()), snakeSpeed);
    return () => clearTimeout(timeout);
  }, [headCoords, pause]);

  useEffect(() => {
    if (pause) return;
    const timeoutNewPiece = setTimeout(() => dispatch(setPieceCoords()), 8000);
    return () => clearTimeout(timeoutNewPiece);
  }, [newPieceCoords, pause]);

  const fieldGenerator = (width, height) => {
    return {
      gridTemplateColumns: `repeat(${width}, auto)`,
      gridTemplateRows: `repeat(${height}, auto)`,
    };
  };
  const body = (el) => {
    for (let i = 0; i <= snakeBody.length - 1; i++) {
      if (snakeBody[i][0] === el[0] && snakeBody[i][1] === el[1]) {
        return true;
      }
    }
    return false;
  };
  return (
    <>
      <div className="score">{`Score: ${score}`}</div>

      <div
        style={fieldGenerator(width, height)}
        className="App"
        tabIndex="0"
        ref={field}
        onKeyDown={(e) => {
          dispatch(keyAction(e.key));
        }}>
        {divCoordinates.map((el) => {
          if (el[0] === newPieceCoords[0] && el[1] === newPieceCoords[1])
            return <Cell key={el} classProp="newPiece" />;
          return body(el) ? <Cell key={el} classProp={'snake'} /> : <Cell key={el} />;
        })}
      </div>
    </>
  );
};

export default Game;
