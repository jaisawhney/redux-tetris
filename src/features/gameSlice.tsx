import { createSlice } from '@reduxjs/toolkit';
import { defaultState } from "../utils";

export const gameSlice = createSlice({
    name: 'game',
    initialState: defaultState(),
    reducers: {
        pause: () => {},
        resume: () => {},
        moveLeft: () => {},
        moveRight: () => {},
        moveDown: () => {},
        rotate: () => {},
        gameOver: () => {},
        restart: () => {},
    },
});

export const {
    moveLeft,
    moveRight,
    moveDown,
    rotate,
    pause,
    resume,
    gameOver,
    restart,
} = gameSlice.actions;

export default gameSlice.reducer;
