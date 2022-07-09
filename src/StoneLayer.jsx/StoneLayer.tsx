import React from 'react';
import Circle from '../Circle/Circle';
import { Coords } from '../Types/SnakeTypes';
import './StoneLayer.scss';

type StoneLayerProps = {
    circlesCoords: Coords[]
}
const StoneLayer: React.FC<StoneLayerProps> = React.memo(({ circlesCoords }) => {
  return (
    <div className="stoneLayer">
      {circlesCoords.map((el) => (
        <Circle key={`${Date.now()}+${el}+${Math.random()}`} circleCoords={el} />
      ))}
    </div>
  );
});

export default StoneLayer;
