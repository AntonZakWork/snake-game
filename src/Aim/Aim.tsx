import React, { useLayoutEffect, useMemo, useRef, useState } from 'react';
import {ReactComponent as AimSVG} from '../assets/svg/Aim.svg'
import './Aim.scss'
import { Coords } from '../Types/SnakeTypes';
import { setAimPixels } from '../Store/snakeSlice';
import { useAppDispatch } from '../Hooks/useAppDispatch';
import { useTypedSelector } from '../Hooks/useTypedSelector';
type AimProps = {
    aimCoords: Coords,
    aimInitCoords: Coords,
}

const Aim = React.memo(({aimCoords, aimInitCoords}: AimProps) => {
    const aimRef = useRef<HTMLDivElement>(null)
    const {pause, isGameOver} = useTypedSelector(state => state.snake)
    const dispatch = useAppDispatch()
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
        dispatch(setAimPixels([aimRef.current?.getBoundingClientRect().x!, aimRef.current?.getBoundingClientRect().y!]))
        setCoords(prev => {
            return [prev[0] + xDiff, prev[1] + yDiff]
            
        })
    }
   useLayoutEffect(()=>{
    if (pause || isGameOver) return
    const coordsInterval = setInterval(aimMover, 25)
    return () => clearInterval(coordsInterval)
   },[aimCoords, pause, isGameOver])
   return (
    <>
      <div className="aim" ref = {aimRef} style = {{ top: `${x}px`, left: `${y}px` }}>
     <AimSVG/>
      </div>
    </>
  );
});

export default Aim;
