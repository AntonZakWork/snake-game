import React, { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './App.scss';
import Cell from './Cell';
import { setDirection, setDivCoordinates, setHeadCoords, setPieceCoords } from './Store/snakeSlice';

function App() {
  const field = useRef();
  const dispatch = useDispatch();
  const { width, height, divCoordinates, headCoords, newPieceCoords, isGameOver } = useSelector(
    (state) => state.snake,
  );
  useEffect(() => {
    dispatch(setDivCoordinates());
    field.current.focus();
    dispatch(setPieceCoords());
  }, []);
  useEffect(() => {
    if (headCoords[0] === newPieceCoords[0] && headCoords[1] === newPieceCoords[1]) {
      dispatch(setPieceCoords());
    }
    const timeout = setTimeout(() => dispatch(setHeadCoords()), 100);
    return () => clearTimeout(timeout);
  }, [headCoords]);

  useEffect(() => {
    const timeoutNewPiece = setTimeout(() => dispatch(setPieceCoords()), 8000);
    return () => clearTimeout(timeoutNewPiece);
  }, [newPieceCoords]);

  const fieldGenerator = (width, height) => {
    return {
      gridTemplateColumns: `repeat(${width}, auto)`,
      gridTemplateRows: `repeat(${height}, auto)`,
    };
  };

  return (
    <>
      {isGameOver ? (
        'You lose!'
      ) : (
        <div
          style={fieldGenerator(width, height)}
          className="App"
          tabIndex="0"
          ref={field}
          onKeyDown={(e) => {
            dispatch(setDirection(e.key));
          }}>
          {divCoordinates.map((el) => (
            <Cell key={el} el={el} />
          ))}
        </div>
      )}
    </>
  );
}

export default App;
