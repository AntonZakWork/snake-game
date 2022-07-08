import React, { useEffect } from 'react';
import './Rock.scss';
import { ReactComponent as RockSVG } from '../assets/svg/rock.svg';
import { resetRocks } from '../Store/snakeSlice';
import { Coords } from '../Types/SnakeTypes';
import { useAppDispatch } from '../Hooks/useAppDispatch';
type RockProps = {
    rockCoords: Coords
}
const Rock: React.FC<RockProps> = React.memo(({ rockCoords }) => {
  const [top, left] = rockCoords;
  const dispatch = useAppDispatch();
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
