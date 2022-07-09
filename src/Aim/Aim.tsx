import React, { useLayoutEffect, useMemo, useState } from 'react';
import {ReactComponent as AimSVG} from '../assets/svg/Aim.svg'
import './Aim.scss'
import { Coords } from '../Types/SnakeTypes';
type AimProps = {
    aimCoords: Coords,
    aimInitCoords: Coords,
}

const Aim = React.memo(({aimCoords, aimInitCoords}: AimProps) => {
    const [initX, initY]= aimInitCoords
    const [coords, setCoords] = useState<Coords>([initX*21, initY*21])
    const [x, y]= coords
    const diffCalculator = ( aimCoords: Coords) => {
        const [currX, currY]= aimCoords
        const xDiff = ((currX-initX)*21)/200
        const yDiff = ((currY-initY)*21)/200
        return [xDiff, yDiff]
    }
    const [xDiff, yDiff] = useMemo(()=>{  
        return diffCalculator(aimCoords)
    },[aimCoords])
    const aimMover = () => {
        setCoords(prev => {
            return [prev[0] + xDiff, prev[1] + yDiff]
        })
    }
   useLayoutEffect(()=>{
    console.log('effect')
    const coordsInterval = setInterval(aimMover, 50)
    return () => clearInterval(coordsInterval)
   },[aimCoords])
   return (
    <>
      <div className="aim" style = {{ top: `${x}px`, left: `${y}px` }}>
     <AimSVG/>
      </div>
    </>
  );
});

export default Aim;
