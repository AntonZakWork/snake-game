import React, { useEffect, useState } from 'react';
import './Circle.scss';
import { setRockCoords } from '../Store/snakeSlice';
import { useDispatch } from 'react-redux';
import Rock from '../Rock/Rock';
const Circle = React.memo(({ circleCoords }) => {
  console.log(circleCoords);
  const [showCircle, setShowCircle] = useState(true);
  const dispatch = useDispatch();
  useEffect(() => {
    setShowCircle(true);
  }, [circleCoords]);

  const [top, left] = circleCoords;
  const setRocksCoordinates = (top, left) => {
    const topCoord = top * 21;
    const leftCoord = left * 21;
    let coords;
    coords = { top: `${topCoord}px`, left: `${leftCoord}px` };
    return coords;
  };
  return (
    <>
      {showCircle ? (
        <div
          onAnimationEnd={() => {
            setShowCircle(false);
            dispatch(setRockCoords(circleCoords));
          }}
          className="circle"
          style={setRocksCoordinates(top, left)}></div>
      ) : (
        <Rock rockCoords={circleCoords} />
      )}
    </>
  );
});

export default Circle;
