import React, { useEffect, useRef, useState } from 'react';
import '../Game/Game.scss';
import Game from '../Game/Game';
import {
  increaseScore,
  keyAction,
  setDivCoordinates,
  setHeadCoords,
  setPieceCoords,
  toggleSettings,
} from '../Store/snakeSlice';
import Snakebody from '../Game/Snakebody/Snakebody';
import Settings from '../Settings/Settings';
import Apple from '../Apple/Apple';
import Restart from '../Restart/Restart';
import StoneLayer from '../StoneLayer.jsx/StoneLayer';
import { useTypedSelector } from '../Hooks/useTypedSelector';
import { Coords, Directions } from '../Types/SnakeTypes';
import { useAppDispatch } from '../Hooks/useAppDispatch';

const GameContainer = () => {
  const [display, setDisplay] = useState(false);
  const [remove, setRemove] = useState(true);
  const field = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();
  const {
    width,
    height,
    divCoordinates,
    headCoords,
    newPieceCoords,
    score,
    snakeBody,
    snakeSpeed,
    pause,
    isGameOver,
    fieldProps,
    showSettings,
    circlesCoords,
    rocksCoords,
    stonesAmount
  } = useTypedSelector((state) => state.snake);

  useEffect(() => {
    field.current?.focus();
    dispatch(setDivCoordinates());
    dispatch(setPieceCoords());
  }, [height, width, snakeSpeed, stonesAmount]);

useEffect(()=>{
    dispatch(setPieceCoords())
},[])

  useEffect(() => {
    field.current?.focus();
  }, [isGameOver, showSettings]);

  useEffect(() => {
    if (pause || isGameOver) return;
    if (headCoords[0] === newPieceCoords[0] && headCoords[1] === newPieceCoords[1]) {
      dispatch(setPieceCoords());
      dispatch(increaseScore());
    }
    const timeout = setTimeout(() => dispatch(setHeadCoords()), snakeSpeed!);
    return () => clearTimeout(timeout);
  }, [headCoords, rocksCoords, pause, isGameOver]);

  useEffect(() => {
    if (pause || isGameOver) return;
    const timeoutNewPiece = setTimeout(() => dispatch(setPieceCoords()), 8000);
    return () => clearTimeout(timeoutNewPiece);
  }, [newPieceCoords, pause, isGameOver]);

  useEffect(() => {
    if (pause || isGameOver) return;
    
    const timeoutRock = setTimeout(() => dispatch(setPieceCoords('rock')), 8000);
    return () => clearTimeout(timeoutRock);
  }, [circlesCoords, pause, isGameOver]);
  return (
    <>
      <div
        className="settingsIcon"
        tabIndex={0}
        onClick={() => {
          setRemove((prev) => !prev);
          remove && dispatch(toggleSettings());
        }}>
        <svg
          enableBackground="new 0 0 32 32"
          id="Editable-line"
          version="1.1"
          viewBox="0 0 32 32"
          xmlSpace="preserve"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink">
          <circle
            cx="16"
            cy="16"
            fill="none"
            id="XMLID_224_"
            r="4"
            stroke="#000000"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeMiterlimit="10"
            strokeWidth="2"
          />
          <path
            d="  M27.758,10.366l-1-1.732c-0.552-0.957-1.775-1.284-2.732-0.732L23.5,8.206C21.5,9.36,19,7.917,19,5.608V5c0-1.105-0.895-2-2-2h-2  c-1.105,0-2,0.895-2,2v0.608c0,2.309-2.5,3.753-4.5,2.598L7.974,7.902C7.017,7.35,5.794,7.677,5.242,8.634l-1,1.732  c-0.552,0.957-0.225,2.18,0.732,2.732L5.5,13.402c2,1.155,2,4.041,0,5.196l-0.526,0.304c-0.957,0.552-1.284,1.775-0.732,2.732  l1,1.732c0.552,0.957,1.775,1.284,2.732,0.732L8.5,23.794c2-1.155,4.5,0.289,4.5,2.598V27c0,1.105,0.895,2,2,2h2  c1.105,0,2-0.895,2-2v-0.608c0-2.309,2.5-3.753,4.5-2.598l0.526,0.304c0.957,0.552,2.18,0.225,2.732-0.732l1-1.732  c0.552-0.957,0.225-2.18-0.732-2.732L26.5,18.598c-2-1.155-2-4.041,0-5.196l0.526-0.304C27.983,12.546,28.311,11.323,27.758,10.366z  "
            fill="none"
            id="XMLID_242_"
            stroke="#000000"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeMiterlimit="10"
            strokeWidth="2"
          />
        </svg>
      </div>
      <Settings remove={remove} setRemove={setRemove} />
      <div className="score">{`Score: ${score}`}</div>
      {isGameOver ? <Restart /> : ''}
      <div
        className="gameContainer"
        ref={field}
        tabIndex={0}
        onKeyDown={(e:React.KeyboardEvent) => {
          // ???
          dispatch(keyAction(e.key as Directions));
        }}>
        {pause ? (
          <div className="pauseIcon">
            <svg
              height="300"
              id="Layer_1"
              version="1.1"
              viewBox="0 0 100 100"
              width="300"
              xmlSpace="preserve"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink">
              <g>
                <path d="M89.746,37.141C85.096,16.166,64.732,2.218,43.832,1.848c-1.309-0.024-2.262,0.523-2.863,1.325   C23.926,2.807,8.109,17.376,2.571,32.604c-5.963,16.402-0.173,35.694,13.043,46.894c15.015,12.725,38.882,12.375,55.499,2.748   C86.623,73.263,93.563,54.335,89.746,37.141z M72.678,74.021c-12.801,10.57-35.566,12.858-49.723,3.927   C10.405,70.025,3.084,53.963,5.929,39.314c1.685-8.664,6.47-16.28,12.834-22.298c6.205-5.869,13.545-9.056,21.445-11.722   c-0.139,1.997,1.066,4.11,3.624,4.083c15.858-0.167,31.864,8.746,38.333,23.583C88.129,46.652,84.262,64.452,72.678,74.021z" />
                <path d="M60.338,63.104c0-0.579-0.406-16.702-0.488-21.588c-0.072-4.371-0.225-8.74-0.441-13.107   c-0.105-2.063-0.102-5.71-2.531-6.516c-1.115-0.372-3.807,1.806-3.645,8.293c0.121,4.745-0.734,9.462-1.043,14.201   c-0.299,4.58-0.607,9.162-0.867,13.744c-0.139,2.527-0.824,5.985,0.459,8.32c2.631,4.801,9.561,1.309,8.557-3.34   C60.338,63.107,60.338,63.105,60.338,63.104z" />
                <path d="M38.556,63.104c0-0.579-0.408-16.702-0.489-21.588c-0.072-4.371-0.225-8.74-0.444-13.107   c-0.103-2.063-0.099-5.71-2.529-6.516c-1.114-0.372-3.806,1.806-3.644,8.293c0.121,4.745-0.736,9.462-1.043,14.201   c-0.299,4.58-0.607,9.162-0.864,13.744c-0.143,2.527-0.827,5.985,0.456,8.32c2.63,4.801,9.563,1.309,8.558-3.34   C38.556,63.107,38.556,63.105,38.556,63.104z" />
              </g>
            </svg>
          </div>
        ) : (
          ''
        )}
        {display &&
          snakeBody.map((el, index) => {
            if(index === snakeBody.length-1) return <Snakebody key={`${el} + ${index}`} el={el} headprop = {true}/>
            return <Snakebody key={`${el} + ${index}`} el={el} />;
          })}
        {display && !isGameOver && !!newPieceCoords.length && <Apple newPieceCoords={newPieceCoords as Coords} />}
        {!isGameOver && <StoneLayer circlesCoords={circlesCoords as Coords[]} />}
        <Game
          isGameOver={isGameOver}
          divCoordinates={divCoordinates}
          fieldProps={fieldProps!}
          setDisplay={setDisplay}
        />
      </div>
    </>
  );
};

export default GameContainer;
