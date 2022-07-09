import { SnakeState, StoredData, FieldProps, Coords, Directions, FormData } from './../Types/SnakeTypes';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: SnakeState = {
  height: null,
  width: null,
  divCoordinates: [],
  fieldProps: null,
  headCoords: [null, null],
  direction: 'ArrowUp',
  newPieceCoords: [],
  snakeBody: [],
  prevPieceCoords: [],
  isGameOver: false,
  score: 0,
  showStartForm: true,
  snakeSpeed: null,
  maxSnakeSpeed: 30,
  pause: false,
  showRestart: false,
  showSettings: false,
  circlesCoords: [],
  stonesAmount: null,
  rocksCoords: [],
  keyTiming: null,
  aimCoords: [],
  aimInitCoords: [],
};

export const snakeSlice = createSlice({
  name: 'snake',
  initialState,
  reducers: {
    reset(state) {
        
      if (localStorage.getItem('values')) {
        
        let { height, width, snakeSpeed }: StoredData = JSON.parse(localStorage.getItem('values') as string);
        state.height = +height;
        state.width = +width;
        if (snakeSpeed < 20) snakeSpeed = 20;
        state.snakeSpeed = state.maxSnakeSpeed / (snakeSpeed / 100);
      }
      state.snakeBody = [];
      state.prevPieceCoords = [];
      state.score = 0;
      state.isGameOver = false;
      state.rocksCoords = [];
      state.circlesCoords = [];
      state.newPieceCoords = [];
      state.aimCoords = [];
      state.aimInitCoords = [];
      localStorage.clear();
    },
    setDivCoordinates(state) {
        
      state.divCoordinates = [];
      for (let i = 1; i <= state.height! * state.width!; i++) {
        state.divCoordinates.push(i);
      }
      const fieldGenerator = (width: number, height: number):FieldProps => {
        return {
          gridTemplateColumns: `repeat(${width}, auto)`,
          gridTemplateRows: `repeat(${height}, auto)`,
        };
      };
      state.fieldProps = fieldGenerator(state.width!, state.height!);
      state.headCoords  = [Math.floor(state.height! / 2), Math.floor(state.width! / 2)];
    },

    setHeadCoords(state) {
      if (state.snakeBody.length === 0) state.snakeBody.push(state.headCoords as Coords);
      if (
        !(
          state.headCoords[0] === state.prevPieceCoords[0] &&
          state.headCoords[1] === state.prevPieceCoords[1]
        )
      ) {
        state.snakeBody.shift();
        state.prevPieceCoords = [];
      }
      switch (state.direction) {
        default:
          return state;
        case 'ArrowUp': {
          const newCoords:Coords = [state.headCoords[0]! - 1, state.headCoords[1]!];
          if (newCoords[0]! < 1) newCoords[0] = state.height!;
          state.headCoords = newCoords;
          break;
        }
        case 'ArrowDown': {
          const newCoords: Coords = [state.headCoords[0]! + 1, state.headCoords[1]!];
          if (newCoords[0] > state.height!) newCoords[0] = 1;
          state.headCoords = newCoords;
          break;
        }
        case 'ArrowLeft': {
          const newCoords: Coords = [state.headCoords[0]!, state.headCoords[1]! - 1];
          if (newCoords[1] < 1) newCoords[1] = state.width!;
          state.headCoords = newCoords;
          break;
        }
        case 'ArrowRight': {
          const newCoords: Coords = [state.headCoords[0]!, state.headCoords[1]! + 1];
          if (newCoords[1] > state.width!) newCoords[1] = 1;
          state.headCoords = newCoords;
          break;
        }
      }
      for (let i = 0; i <= state.snakeBody.length - 1; i++) {
        if (
          state.snakeBody[i][0] === state.headCoords[0] &&
          state.snakeBody[i][1] === state.headCoords[1]
        ) {
          state.isGameOver = true;
        }
      }
      state.snakeBody.push(state.headCoords);
      for (let i = 0; i <= state.rocksCoords.length - 1; i++) {
        if (
          state.rocksCoords[i][0] === state.headCoords[0] &&
          state.rocksCoords[i][1] === state.headCoords[1]
        ) {
          state.isGameOver = true;
        }
      }
    },
    keyAction(state, action: PayloadAction<Directions>) {
      switch (action.payload) {
        default:
          return state;
        case 'ArrowUp': {
          if (state.direction === 'ArrowDown') return state;
          break;
        }
        case 'ArrowDown': {
          if (state.direction === 'ArrowUp') return state;
          break;
        }
        case 'ArrowLeft': {
          if (state.direction === 'ArrowRight') return state;
          break;
        }
        case 'ArrowRight': {
          if (state.direction === 'ArrowLeft') return state;
          break;
        }
        case ' ': {
          if (!state.isGameOver) {
            state.pause = !state.pause;
          }
          return state;
        }
      }
      state.direction = action.payload;
    },
    setPieceCoords(state, action: PayloadAction<string | undefined>) {
      state.prevPieceCoords = state.newPieceCoords;
      
      const getCoords = (type?: string): Coords => {
        
        let xCoord = Math.ceil(Math.random() * state.height!);
        let yCoord = Math.ceil(Math.random() * state.width!);
        if(type === 'initAim') {
            return [xCoord, yCoord]
         }
         if(type === 'aim') {
            if(!state.aimCoords.length) {
                return [state.height!+1, Math.ceil((Math.random()*state.width!))]
            } else if(state.aimCoords[0] === state.height!+1) {
                return [1, Math.ceil((Math.random()*state.width!))]
            } else {
                return [state.height!+1, (Math.random()*state.width!)]
            }
         }
        const body = (x: number, y: number, type: string | undefined): Coords => {
          for (let i = 0; i < state.snakeBody.length; i++) {
            if (state.snakeBody[i][0] === x && state.snakeBody[i][1] === y) {
              return  getCoords();
            }
            if (type === 'rock') {
              for (let j = 0; j < state.rocksCoords.length; j++) {
                if (state.rocksCoords[j][0] === x && state.rocksCoords[j][1] === y) {
                  return getCoords();
                }
              }
            }
          }
          return [xCoord, yCoord];
        };
        return body(xCoord, yCoord, type);
      };
      if (!action.payload) {
        state.newPieceCoords = getCoords('piece');
      }
      if (action.payload === 'rock') {
        let arr: Coords[] = [];
        for (let i = 0; i < state.stonesAmount!; i++) {
          const temp = getCoords();
          arr.push(temp);
        }
        state.circlesCoords = arr;
      }
      if (action.payload === 'aim') {
        if(state.aimInitCoords.length === 0) {
            state.aimInitCoords = getCoords('initAim')
        } else { 
            state.aimInitCoords = state.aimCoords 
        }
        state.aimCoords = getCoords('aim')
      }
    },
    increaseScore(state) {
      state.score += 1;
    },
    setFormData(state, action: PayloadAction<FormData>) {
      let { height, width, snakeSpeed, stonesAmount } = action.payload;
      state.height = height;
      state.width = width;
      if (snakeSpeed < 20) snakeSpeed = 20;
      state.snakeSpeed = state.maxSnakeSpeed / (snakeSpeed / 100);
      let maxStonesAmount = Math.ceil(height*width*0.02)
      if (stonesAmount < 20) stonesAmount = 20;
      state.stonesAmount = maxStonesAmount * (stonesAmount / 100);

    },
    toggleStartForm(state) {
      state.showStartForm = false;
    },
    toggleSettings(state) {
      state.pause = !state.pause;
      state.showSettings = !state.showSettings;
    },
    setRockCoords(state, action) {
      state.rocksCoords = [...state.rocksCoords, action.payload];
    },
    setGameOver(state) {
      state.isGameOver = true;
    },
    resetRocks(state) {
      state.rocksCoords = [];
    },
  },
});

export const {
  setDivCoordinates,
  setHeadCoords,
  keyAction,
  setPieceCoords,
  increaseScore,
  reset,
  setFormData,
  toggleStartForm,
  toggleSettings,
  setRockCoords,
  setGameOver,
  resetRocks,
} = snakeSlice.actions;

export default snakeSlice.reducer;
