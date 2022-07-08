import React from 'react';
import './Game.scss';
import Cell from '../Cell';
import { setPieceCoords } from '../Store/snakeSlice';
import { FieldProps } from '../Types/SnakeTypes';
import { useAppDispatch } from '../Hooks/useAppDispatch';

type GameProps = {
    isGameOver: boolean;
    fieldProps: FieldProps,
    divCoordinates: number[],
    setDisplay: (x: boolean)=>void
}

const Game: React.FC<GameProps> = React.memo(({ isGameOver, fieldProps, divCoordinates, setDisplay }) => {
  const dispatch = useAppDispatch();
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
