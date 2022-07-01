import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  height: 20,
  width: 20,
  divCoordinates: [],
  headCoords: [1, 1],
  direction: 'ArrowUp',
  newPieceCoords: [null, null],
  snakeBody: [],
  prevPieceCoords: [null, null],
  isGameOver: false,
  score: 0,
  showStartForm: true,
  snakeSpeed: null,
  maxSnakeSpeed: 30,
  pause: false,
  showRestart: false,
  showSettings: false,
};

export const snakeSlice = createSlice({
  name: 'snake',
  initialState,
  reducers: {
    reset(state) {
      state.headCoords = [1, 1];
      state.newPieceCoords = [5, 5];
      state.snakeBody = [];
      //   state.divCoordinates = [];
      state.prevPieceCoords = [null, null];
      state.score = 0;
      state.isGameOver = false;
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
    keyAction(state, action) {
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
              getCoords();
            }
          }
        };
        body(xCoord, yCoord);
      };
      getCoords();
      state.newPieceCoords = [xCoord, yCoord];
    },
    increaseScore(state) {
      state.score += 1;
    },
    setFormData(state, action) {
      const { height, width, snakeSpeed } = action.payload;
      state.height = +height;
      state.width = +width;
      let snakeSpeedNum = +snakeSpeed;
      if (snakeSpeedNum < 20) snakeSpeedNum = 20;
      state.snakeSpeed = state.maxSnakeSpeed / (snakeSpeedNum / 100);
      //   state.showStartForm = false;
    },
    toggleStartForm(state) {
      state.showStartForm = false;
    },
    toggleSettings(state) {
      state.pause = !state.pause;
      state.showSettings = !state.showSettings;
    },
  },
});

export const {
  setDivCoordinates,
  setHeadCoords,
  keyAction,
  setPieceCoords,
  changeSnakeLength,
  increaseScore,
  reset,
  setFormData,
  toggleStartForm,
  setShowRestart,
  toggleSettings,
} = snakeSlice.actions;

export default snakeSlice.reducer;
