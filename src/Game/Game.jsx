import React from 'react';
import './Game.scss';
import Cell from '../Cell';
import { setPieceCoords } from '../Store/snakeSlice';
import { useDispatch } from 'react-redux';

const Game = React.memo(({ isGameOver, fieldProps, divCoordinates, setDisplay }) => {
  const dispatch = useDispatch();
  return (
    <>
      <div
        style={fieldProps}
        className={isGameOver ? 'App remove' : 'App'}
        onAnimationStart={() => setDisplay(false)}
        onAnimationEnd={() => {
          !isGameOver && dispatch(setPieceCoords());
          setDisplay(true);
        }}>
        {divCoordinates.map((el) => {
          return <Cell key={el} />;
        })}
      </div>
    </>
  );
});

export default Game;
