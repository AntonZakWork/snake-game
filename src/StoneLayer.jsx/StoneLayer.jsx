import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Circle from '../Circle/Circle';
import { setPieceCoords, setRockCoords } from '../Store/snakeSlice';
import './StoneLayer.scss';
const StoneLayer = React.memo(({ circlesCoords }) => {
  const dispatch = useDispatch();
  const [rocksDispatch, setRocksDispatch] = useState(false);

  //   const dispatchRocks = (circlesCoords) => {
  //     dispatch(setRockCoords(circlesCoords));
  //   };
  //   if (rocksDispatch) {
  //     dispatchRocks(circlesCoords);
  //   }
  return (
    <div className="stoneLayer">
      {circlesCoords.map((el) => (
        <Circle key={`${Date.now()}+${el}`} circleCoords={el} setRocksDispatch={setRocksDispatch} />
      ))}
    </div>
  );
});

export default StoneLayer;
