import React from 'react';
import { useSelector } from 'react-redux';
import Game from './Game/Game';
import Form from './Form/Form';

const App = () => {
  const { showStartForm } = useSelector((state) => state.snake);
  return <>{showStartForm ? <Form /> : <Game />}</>;
};

export default App;
