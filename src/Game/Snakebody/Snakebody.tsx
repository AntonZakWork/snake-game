import React, { useEffect } from 'react';
import { Coords } from '../../Types/SnakeTypes';
import './Snakebody.scss';

type SnakeProps = {
    el: Coords
}
const Snakebody: React.FC<SnakeProps> = ({ el }) => {
  const [top, left] = el;
  useEffect(() => {}, [top, left]);
  return <div className="snakebody" style={{ top: `${top*21}px`, left: `${left*21}px` }}></div>;
};

export default Snakebody;
