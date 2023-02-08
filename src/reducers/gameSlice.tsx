import { createSlice } from '@reduxjs/toolkit';
import {
    defaultState,
    nextRotation,
    canMoveTo,
    addBlockToGrid,
    randomShape,
    checkRows,
    calcScore,
} from '../utils';
import { INITIAL_ROTATION, INITIAL_X, INITIAL_Y } from "../constants/gameDefaults";

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
        moveX: (state, action) => {
            const { shape, grid, x, y, rotation } = state;
            const offset = action.payload;
            if (canMoveTo(shape, grid, x + offset, y, rotation)) {
                state.x = x + offset;
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
            state.x = INITIAL_X;
            state.y = INITIAL_Y;
            state.rotation = INITIAL_ROTATION;
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
            state.score += calcScore(clearedRows, state.level);
            state.levelRowsCleared += clearedRows;

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
        drop: (state) => {
            const { x, y, shape, grid, rotation } = state;

            let currentY = y;
            while (canMoveTo(shape, grid, x, currentY, rotation)) {
                currentY += 1;
            }
            currentY -= 1;

            state.y = currentY;
            return state;
        },
    },
});

export const { moveX, moveDown, rotate, pause, resume, restart, drop } =
    gameSlice.actions;

export default gameSlice.reducer;
