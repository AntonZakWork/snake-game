import React, { useEffect } from 'react';
import './Snakebody.scss';
const Snakebody = ({ el }) => {
  const [top, left] = el;
  const setCellCoordinates = (top, left) => {
    const topCoord = top * 21;
    const leftCoord = left * 21;
    const coords = { top: `${topCoord}px`, left: `${leftCoord}px` };
    return coords;
  };
  useEffect(() => {}, [top, left]);
  return <div className="snakebody" style={setCellCoordinates(top, left)}></div>;
};

export default Snakebody;
