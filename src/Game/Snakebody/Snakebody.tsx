import React, { useEffect, useLayoutEffect, useRef } from 'react';
import { useAppDispatch } from '../../Hooks/useAppDispatch';
import { useTypedSelector } from '../../Hooks/useTypedSelector';
import { setHeadPixels } from '../../Store/snakeSlice';
import { Coords } from '../../Types/SnakeTypes';
import Eyes from './Eyes/Eyes';
import './Snakebody.scss';
type SnakeProps = {
    el: Coords
    headprop?: boolean
}
const Snakebody: React.FC<SnakeProps> = React.memo(({ el, headprop }) => {
    const dispatch = useAppDispatch()
    const {direction, isGameOver} = useTypedSelector(state => state.snake)
    const headRef = useRef<HTMLDivElement>(null) 
    useLayoutEffect(()=>{
        headprop && dispatch(setHeadPixels([headRef.current?.getBoundingClientRect().x!, headRef.current?.getBoundingClientRect().y!]))
    },[])
  const [top, left] = el;
  useEffect(() => {}, [top, left]);
  return <div ref = {headRef} className={headprop? "snakebody head" : "snakebody"} style={{ top: `${top*21}px`, left: `${left*21}px` }}>
    {headprop && !isGameOver &&<div className = 'eyes'><Eyes direction = {direction}/></div>}
  </div>;
});

export default Snakebody;
