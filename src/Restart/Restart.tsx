import React, { useEffect, useRef } from 'react';
import { useAppDispatch } from '../Hooks/useAppDispatch';
import { reset } from '../Store/snakeSlice';
import './Restart.scss';
const Restart = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    restartRef.current?.focus();
  }, []);
  const restartRef = useRef<HTMLButtonElement>(null);
  return (
    <div className="restartContainer">
      <div className="text">You lose!</div>
      <button ref={restartRef} onClick={() => dispatch(reset())}>
        Play again!
      </button>
    </div>
  );
};

export default Restart;
