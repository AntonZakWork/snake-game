import React, { useLayoutEffect, useRef } from 'react';
import './Game.scss';
import Cell from '../Cell';
import { setGamePixels, setPieceCoords } from '../Store/snakeSlice';
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
  const gameRef = useRef<HTMLDivElement>(null)
  useLayoutEffect(()=>{
    dispatch(setGamePixels([gameRef.current?.getBoundingClientRect().x!, gameRef.current?.getBoundingClientRect().y!]))
    console.log(gameRef.current?.getBoundingClientRect())
  },[])
  return (
    <>
      <div
        style={fieldProps}
        ref = {gameRef}
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
