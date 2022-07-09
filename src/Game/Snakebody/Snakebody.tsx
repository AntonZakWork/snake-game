import React, { useEffect } from 'react';
import { useTypedSelector } from '../../Hooks/useTypedSelector';
import { Coords } from '../../Types/SnakeTypes';
import Eyes from './Eyes/Eyes';
import './Snakebody.scss';
// import { ReactComponent as Eyes } from '../../../assets/svg/eyes.svg';
type SnakeProps = {
    el: Coords
    headprop?: boolean
}
const Snakebody: React.FC<SnakeProps> = React.memo(({ el, headprop }) => {
    const {direction, isGameOver} = useTypedSelector(state => state.snake)
  const [top, left] = el;
  useEffect(() => {}, [top, left]);
  return <div className={headprop? "snakebody head" : "snakebody"} style={{ top: `${top*21}px`, left: `${left*21}px` }}>
    {headprop && !isGameOver &&<div className = 'eyes'><Eyes direction = {direction}/></div>}
  </div>;
});

export default Snakebody;
