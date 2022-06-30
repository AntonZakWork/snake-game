import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Game from './Game/Game';
import Form from './Form/Form';
import { reset } from './Store/snakeSlice';

const App = () => {
  const { isGameOver } = useSelector((state) => state.snake);
  const dispatch = useDispatch();
  const { showStartForm } = useSelector((state) => state.snake);
  return (
    <>
      {showStartForm ? (
        <Form />
      ) : isGameOver ? (
        <>
          <div className="text">You lose!</div>
          <button onClick={() => dispatch(reset())}>Play again!</button>
        </>
      ) : (
        <Game />
      )}
    </>
  );
};

export default App;
