import './Apple.scss';
import { ReactComponent as RedApple } from '../assets/svg/red_apple.svg';
import { ReactComponent as GreenApple } from '../assets/svg/green_apple.svg';
import { ReactComponent as Berry } from '../assets/svg/berry.svg';
import { ReactComponent as Strawberry } from '../assets/svg/strawberry.svg';
import React from 'react';

const Apple = React.memo(({ newPieceCoords }) => {
  const fruitArray = [RedApple, GreenApple, Berry, Strawberry];
  const chooseFruit = (fruitArray) => {
    return fruitArray[Math.floor(Math.random() * fruitArray.length)];
  };
  const Item = chooseFruit(fruitArray);
  const [top, left] = newPieceCoords;
  const setAppleCoordinates = (top, left) => {
    const topCoord = top * 21;
    const leftCoord = left * 21;
    const coords = { top: `${topCoord}px`, left: `${leftCoord}px` };
    return coords;
  };
  return (
    <div className="newPiece" style={setAppleCoordinates(top, left)}>
      <Item />
    </div>
  );
});

export default Apple;
