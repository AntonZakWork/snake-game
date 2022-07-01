import React, { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { reset } from '../Store/snakeSlice';
import './Restart.scss';
const Restart = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    restartRef.current.focus();
  }, []);
  const restartRef = useRef();
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
