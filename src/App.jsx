import React from 'react';
import { useSelector } from 'react-redux';
import Game from './Game/Game';
import Form from './Form/Form';
import GameContainer from './GameContainer/GameContainer';

const App = () => {
  const { showStartForm } = useSelector((state) => state.snake);
  return <>{showStartForm ? <Form /> : <GameContainer />}</>;
};

export default App;
