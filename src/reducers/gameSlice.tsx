import { createSlice } from '@reduxjs/toolkit';
import {
    defaultState,
    nextRotation,
    canMoveTo,
    addBlockToGrid,
    randomShape,
    checkRows,
} from '../utils';

export const gameSlice = createSlice({
    name: 'game',
    initialState: defaultState(),
    reducers: {
        pause: (state) => {
            state.isRunning = false;
            return state;
        },
        resume: (state) => {
            state.isRunning = true;
            return state;
        },
        moveLeft: (state) => {
            const { shape, grid, x, y, rotation } = state;
            if (canMoveTo(shape, grid, x - 1, y, rotation)) {
                state.x = x - 1;
            }
            return state;
        },
        moveRight: (state) => {
            const { shape, grid, x, y, rotation } = state;
            if (canMoveTo(shape, grid, x + 1, y, rotation)) {
                state.x = x + 1;
            }
            return state;
        },
        moveDown: (state) => {
            const { x, y, shape, grid, rotation, nextShape } = state;
            // Get the next potential Y position
            const maybeY = y + 1;
            // Check if the current block can move here
            if (canMoveTo(shape, grid, x, maybeY, rotation)) {
                // If so move the block
                state.y = maybeY;
                return state;
            }

            // If not place the block
            const { newGrid, gameOver } = addBlockToGrid(
                shape,
                grid,
                x,
                y,
                rotation
            );
            if (gameOver) {
                state.gameOver = true;
                return state;
            }

            // reset some things to start a new shape/block
            state.x = 3;
            state.y = -4;
            state.rotation = 0;
            state.grid = newGrid;
            state.shape = nextShape;
            state.nextShape = randomShape();

            if (!canMoveTo(nextShape, newGrid, state.x, state.y, 0)) {
                // Game Over
                state.shape = 0;
                state.isRunning = false;
                state.gameOver = true;
                return state;
            }

            // Get the number of rows cleared
            const clearedRows = checkRows(newGrid);
            const availablePoints = [0, 40, 100, 300, 1200];
            state.levelRowsCleared += clearedRows;
            state.score += availablePoints[clearedRows] * state.level;

            // Increase the level and decrease the interval
            if (state.levelRowsCleared >= 10) {
                state.level += 1;
                state.levelRowsCleared = 0;
                state.speed = state.speed * 0.75;
            }
            return state;
        },
        rotate: (state) => {
            const { shape, grid, x, y, rotation } = state;
            const newRotation = nextRotation(shape, rotation);
            if (canMoveTo(shape, grid, x, y, newRotation)) {
                state.rotation = newRotation;
            }
            return state;
        },
        restart: () => defaultState(),
    },
});

export const { moveLeft, moveRight, moveDown, rotate, pause, resume, restart } =
    gameSlice.actions;

export default gameSlice.reducer;
