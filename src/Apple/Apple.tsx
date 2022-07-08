import './Apple.scss';
import { ReactComponent as RedApple } from '../assets/svg/red_apple.svg';
import { ReactComponent as GreenApple } from '../assets/svg/green_apple.svg';
import { ReactComponent as Berry } from '../assets/svg/berry.svg';
import { ReactComponent as Strawberry } from '../assets/svg/strawberry.svg';
import React from 'react';
import { Coords } from '../Types/SnakeTypes';

type AppleProps = {
    newPieceCoords: Coords
}

type FruitArray = React.FC<React.SVGProps<SVGSVGElement>>[]

const Apple: React.FC<AppleProps> = React.memo(({ newPieceCoords }) => {
  const fruitArray: FruitArray = [RedApple, GreenApple, Berry, Strawberry];
  const chooseFruit = (fruitArray: FruitArray): React.FC<React.SVGProps<SVGSVGElement>> => {
    return fruitArray[Math.floor(Math.random() * fruitArray.length)];
  };
  const Item = chooseFruit(fruitArray);
  const [top, left] = newPieceCoords;
  return (
    <div className="newPiece" style={{ top: `${top*21}px`, left: `${left*21}px` }}>
      <Item />
    </div>
  );
});

export default Apple;
