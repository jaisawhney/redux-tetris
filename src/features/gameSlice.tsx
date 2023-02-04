import { createSlice } from '@reduxjs/toolkit';

export const gameSlice = createSlice({
    name: 'game',
    initialState: {},
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
