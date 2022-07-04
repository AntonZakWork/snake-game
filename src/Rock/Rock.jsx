import React from 'react';
import './Rock.scss';
import { ReactComponent as RockSVG } from '../assets/svg/rock.svg';

const Rock = React.memo(({ rockCoords }) => {
  const [top, left] = rockCoords;

  let coords = { top: `${top}px`, left: `${left}px` };

  return (
    <>
      <div className="rock" style={coords}>
        <RockSVG />
      </div>
    </>
  );
});

export default Rock;
