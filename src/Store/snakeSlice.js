import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  height: null,
  width: null,
  divCoordinates: [],
  fieldProps: null,
  headCoords: [null, null],
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
  circlesCoords: [],
  rocksNumber: 3,
  rocksCoords: [],
};

export const snakeSlice = createSlice({
  name: 'snake',
  initialState,
  reducers: {
    reset(state) {
      if (localStorage.getItem('values')) {
        const { height, width, snakeSpeed } = JSON.parse(localStorage.getItem('values'));
        state.height = +height;
        state.width = +width;
        state.snakeSpeed = +snakeSpeed;
      }
      state.snakeBody = [];
      state.prevPieceCoords = [null, null];
      state.score = 0;
      state.isGameOver = false;
      state.rocksCoords = [];
      state.circlesCoords = [];
      state.newPieceCoords = [];
      localStorage.clear();
    },
    setDivCoordinates(state) {
      state.divCoordinates = [];
      for (let i = 1; i <= state.height * state.width; i++) {
        state.divCoordinates.push(i);
      }
      const fieldGenerator = (width, height) => {
        return {
          gridTemplateColumns: `repeat(${width}, auto)`,
          gridTemplateRows: `repeat(${height}, auto)`,
        };
      };
      state.fieldProps = fieldGenerator(state.width, state.height);
      state.headCoords = [Math.floor(state.height / 2), Math.floor(state.width / 2)];
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
    setPieceCoords(state, action) {
      state.prevPieceCoords = state.newPieceCoords;
      const getCoords = (type = null) => {
        let xCoord = Math.ceil(Math.random() * state.height);
        let yCoord = Math.ceil(Math.random() * state.width);
        const body = (x, y, type) => {
          for (let i = 0; i < state.snakeBody.length; i++) {
            if (state.snakeBody[i][0] === x && state.snakeBody[i][1] === y) {
              getCoords();
            }
            if (type) {
              for (let j = 0; j < state.rocksCoords.length; j++) {
                if (state.rocksCoords[j][0] === x && state.rocksCoords[j][1] === y) {
                  getCoords();
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
        let arr = [];
        for (let i = 0; i < state.rocksNumber; i++) {
          const temp = getCoords();
          arr.push(temp);
        }
        state.circlesCoords = arr;
      }
    },
    increaseScore(state) {
      state.score += 1;
    },
    setFormData(state, action) {
      state.snakeBody = [];
      const { height, width, snakeSpeed } = action.payload;
      state.height = +height;
      state.width = +width;
      let snakeSpeedNum = +snakeSpeed;
      if (snakeSpeedNum < 20) snakeSpeedNum = 20;
      state.snakeSpeed = state.maxSnakeSpeed / (snakeSpeedNum / 100);
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
  changeSnakeLength,
  increaseScore,
  reset,
  setFormData,
  toggleStartForm,
  setShowRestart,
  toggleSettings,
  setRockCoords,
  setGameOver,
  resetRocks,
} = snakeSlice.actions;

export default snakeSlice.reducer;
