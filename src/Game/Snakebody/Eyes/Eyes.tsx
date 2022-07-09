import React from 'react'
 import { ReactComponent as ArrowDown } from '../../../assets/svg/ArrowDown.svg';
 import { ReactComponent as ArrowUp } from '../../../assets/svg/ArrowUp.svg';
 import { ReactComponent as ArrowLeft } from '../../../assets/svg/ArrowLeft.svg';
 import { ReactComponent as ArrowRight } from '../../../assets/svg/ArrowRight.svg';
import { Directions } from '../../../Types/SnakeTypes'

type EyesProps = {
    direction: Directions
}
const Eyes = React.memo(({direction}: EyesProps) => {
    if(direction ==="ArrowUp") return <ArrowDown/>
    if(direction ==="ArrowDown") return <ArrowUp/>
    if(direction ==="ArrowLeft") return <ArrowLeft/>
    if(direction ==="ArrowRight") return <ArrowRight/>
    return null
    })
    
  

export default Eyes