import { SHAPES } from '../constants/gameDefaults';

export const randomNum = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

// Returns the default grid
export const gridDefault = () => {
    const rows = 18;
    const cols = 10;
    const array: number[][] = [];

    for (let row = 0; row < rows; row++) {
        array.push([]);
        for (let col = 0; col < cols; col++) {
            array[row].push(0);
        }
    }

    return array;
};

export const randomShape = () => {
    return randomNum(1, SHAPES.length - 1);
};

// Return the default state for the game
export const defaultState = () => {
    return {
        // Create an empty grid
        grid: gridDefault(),
        // Get a new random shape
        shape: randomShape(),
        // set rotation of the shape to 0
        rotation: 0,
        // set the 'x' position of the shape to 5 and y to -4, which puts the shape in the center of the grid, above the top
        x: 5,
        y: -4,
        // set the index of the next shape to a new random shape
        nextShape: randomShape(),
        // Tell the game that it's currently running
        isRunning: true,
        // Set the score to 0
        score: 0,

        // Start at level 1
        level: 1,
        // Counts the cleared rows for the current level
        levelRowsCleared: 0,
        // Initial game speed
        speed: 1000,

        // Game isn't over yet
        gameOver: false,
    };
};

// Returns the next rotation for a shape
// rotation can't exceed the last index of the rotations for the given shape.
export const nextRotation = (shape: number, rotation: number) => {
    return (rotation + 1) % SHAPES[shape].length;
};

export const canMoveTo = (
    shape: number,
    grid: number[][],
    x: number,
    y: number,
    rotation: number
) => {
    const currentShape = SHAPES[shape][rotation];
    // Loop through all rows and cols of the **shape**
    for (let row = 0; row < currentShape.length; row++) {
        for (let col = 0; col < currentShape[row].length; col++) {
            // Look for a 1 here
            if (currentShape[row][col] !== 0) {
                // x offset on the grid
                const proposedX = col + x;
                // y offset on the grid
                const proposedY = row + y;
                if (proposedY < 0) {
                    continue;
                }
                // Get the row on the grid
                const possibleRow = grid[proposedY];
                // Check row exists
                if (possibleRow) {
                    // Check if this column in the row is undefined if it's off the edges, 0, and empty
                    if (
                        possibleRow[proposedX] === undefined ||
                        possibleRow[proposedX] !== 0
                    ) {
                        return false;
                    }
                } else {
                    return false;
                }
            }
        }
    }
    return true;
};

// Adds a current shape to the grid
export const addBlockToGrid = (
    shape: number,
    grid: number[][],
    x: number,
    y: number,
    rotation: number
) => {
    // At this point the game is not over
    let gameOver = false;
    const block = SHAPES[shape][rotation];
    const newGrid = [...grid];
    for (let row = 0; row < block.length; row++) {
        for (let col = 0; col < block[row].length; col++) {
            if (block[row][col]) {
                const yIndex = row + y;
                // If the yIndex is less than 0 part of the block
                // is off the top of the screen and the game is over
                if (yIndex < 0) {
                    gameOver = true;
                } else {
                    newGrid[row + y][col + x] = shape;
                }
            }
        }
    }
    // Return both the newGrid and the gameOver bool
    return { newGrid, gameOver };
};

export const checkRows = (grid: number[][]) => {
    let clearedRows = 0;
    for (let row = 0; row < grid.length; row++) {
        if (!grid[row].includes(0)) {
            grid.splice(row, 1);
            grid.unshift(new Array(10).fill(0));
            clearedRows += 1;
        }
    }
    return clearedRows;
};
