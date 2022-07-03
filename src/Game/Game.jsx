import React from 'react';
import './Game.scss';
import Cell from '../Cell';

const Game = React.memo(({ isGameOver, fieldProps, divCoordinates, setDisplay }) => {
  return (
    <>
      <div
        style={fieldProps}
        className={isGameOver ? 'App remove' : 'App'}
        onAnimationStart={() => setDisplay(false)}
        onAnimationEnd={() => setDisplay(true)}>
        {divCoordinates.map((el) => {
          return <Cell key={el} />;
        })}
      </div>
    </>
  );
});

export default Game;
