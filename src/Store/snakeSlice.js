import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  height: 10,
  width: 10,
  divCoordinates: [],
  headCoords: [1, 1],
  direction: 'ArrowUp',
  newPieceCoords: [null, null],
  snakeBody: [],
  prevPieceCoords: [null, null],
  isGameOver: false,
};

export const snakeSlice = createSlice({
  name: 'snake',
  initialState,
  reducers: {
    reset(state) {
      state.divCoordinates.length = 0;
    },
    setDivCoordinates(state) {
      for (let i = 1; i <= state.height; i++) {
        for (let j = 1; j <= state.width; j++) {
          state.divCoordinates.push([i, j]);
        }
      }
    },
    setHeadCoords(state) {
      if (state.snakeBody.length === 0) state.snakeBody.push(state.headCoords);
      if (
        !(
          state.headCoords[0] === state.prevPieceCoords[0] &&
          state.headCoords[1] === state.prevPieceCoords[1]
        )
      ) {
        state.snakeBody.shift();
        state.prevPieceCoords = [null, null];
      }
      switch (state.direction) {
        default:
          return state;
        case 'ArrowUp': {
          const newCoords = [state.headCoords[0] - 1, state.headCoords[1]];
          if (newCoords[0] < 1) newCoords[0] = state.height;
          state.headCoords = newCoords;
          break;
        }
        case 'ArrowDown': {
          const newCoords = [state.headCoords[0] + 1, state.headCoords[1]];
          if (newCoords[0] > state.height) newCoords[0] = 1;
          state.headCoords = newCoords;
          break;
        }
        case 'ArrowLeft': {
          const newCoords = [state.headCoords[0], state.headCoords[1] - 1];
          if (newCoords[1] < 1) newCoords[1] = state.width;
          state.headCoords = newCoords;
          break;
        }
        case 'ArrowRight': {
          const newCoords = [state.headCoords[0], state.headCoords[1] + 1];
          if (newCoords[1] > state.width) newCoords[1] = 1;
          state.headCoords = newCoords;
          break;
        }
      }
      for (let i = 0; i < state.snakeBody.length - 1; i++) {
        if (
          state.snakeBody[i][0] === state.headCoords[0] &&
          state.snakeBody[i][1] === state.headCoords[1]
        ) {
          state.isGameOver = true;
        }
      }
      state.snakeBody.push(state.headCoords);
    },
    setDirection(state, action) {
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
      }
      state.direction = action.payload;
    },
    setPieceCoords(state) {
      state.prevPieceCoords = state.newPieceCoords;
      let xCoord;
      let yCoord;
      const getCoords = () => {
        xCoord = Math.ceil(Math.random() * state.height);
        yCoord = Math.ceil(Math.random() * state.width);
        const body = (x, y) => {
          for (let i = 0; i < state.snakeBody.length - 1; i++) {
            if (state.snakeBody[i][0] === x && state.snakeBody[i][1] === y) {
              debugger;
              getCoords();
            }
          }
        };
        body(xCoord, yCoord);
      };
      getCoords();
      state.newPieceCoords = [xCoord, yCoord];
    },
  },
});

export const { setDivCoordinates, setHeadCoords, setDirection, setPieceCoords, changeSnakeLength } =
  snakeSlice.actions;

export default snakeSlice.reducer;
