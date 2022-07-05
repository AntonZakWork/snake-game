import React, { useEffect } from 'react';
import './Rock.scss';
import { ReactComponent as RockSVG } from '../assets/svg/rock.svg';
import { useDispatch } from 'react-redux';
import { resetRocks } from '../Store/snakeSlice';

const Rock = React.memo(({ rockCoords }) => {
  const [top, left] = rockCoords;
  const dispatch = useDispatch();
  useEffect(() => {
    return () => {
      dispatch(resetRocks());
    };
  }, []);
  let coords = { top: `${top * 21}px`, left: `${left * 21}px` };

  return (
    <>
      <div className="rock" style={coords}>
        <RockSVG />
      </div>
    </>
  );
});

export default Rock;
