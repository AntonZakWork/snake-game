import React, { useEffect, useState } from 'react';
import './Circle.scss';
import { setRockCoords } from '../Store/snakeSlice';
import Rock from '../Rock/Rock';
import { Coords } from '../Types/SnakeTypes';
import { useAppDispatch } from '../Hooks/useAppDispatch';

type CircleProps = {
    circleCoords: Coords
}
const Circle: React.FC<CircleProps> = React.memo(({ circleCoords }) => {
  const [showCircle, setShowCircle] = useState(true);
  const dispatch = useAppDispatch();
  useEffect(() => {
    setShowCircle(true);
  }, [circleCoords]);

  const [top, left] = circleCoords;
  let coords = { top: `${top * 21}px`, left: `${left * 21}px` };
  return (
    <>
      {showCircle ? (
        <div
          onAnimationEnd={() => {
            setShowCircle(false);
            dispatch(setRockCoords(circleCoords));
          }}
          className="circle"
          style={coords}></div>
      ) : (
        <Rock rockCoords={circleCoords} />
      )}
    </>
  );
});

export default Circle;
