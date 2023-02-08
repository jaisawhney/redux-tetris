import GridSquare from './GridSquare';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../app/store';
import { SHAPES } from '../constants/gameDefaults';
import { useEffect, useRef } from 'react';
import { moveDown } from '../reducers/gameSlice';

export default function GridBoard() {
    const dispatch = useDispatch();
    const { isRunning, speed, grid, shape, rotation, x, y } = useSelector(
        (state: RootState) => state.game
    );

    const block = SHAPES[shape][rotation];
    const blockColor = shape;

    const gridSquares = grid.map((rowArray, row) => {
        return rowArray.map((square, col) => {
            const blockX = col - x;
            const blockY = row - y;
            let color = square;

            if (
                blockX >= 0 &&
                blockX < block.length &&
                blockY >= 0 &&
                blockY < block.length
            ) {
                color = block[blockY][blockX] === 0 ? color : blockColor;
            }
            // Generate a unique key for every block
            const k = row * grid[0].length + col;

            // Generate a grid square
            return <GridSquare key={k} color={color.toString()} />;
        });
    });

    const requestRef = useRef<DOMHighResTimeStamp>();
    const lastUpdateTimeRef = useRef<DOMHighResTimeStamp>(0);
    const progressTimeRef = useRef<DOMHighResTimeStamp>(0);

    const update = (time: number) => {
        requestRef.current = requestAnimationFrame(update);
        if (!isRunning) return;

        if (!lastUpdateTimeRef.current) {
            lastUpdateTimeRef.current = time;
        }
        const deltaTime = time - lastUpdateTimeRef.current;
        progressTimeRef.current += deltaTime;

        if (progressTimeRef.current > speed) {
            dispatch(moveDown());
            progressTimeRef.current = 0;
        }
        lastUpdateTimeRef.current = time;
    };

    useEffect(() => {
        requestRef.current = requestAnimationFrame(update);
        return () => cancelAnimationFrame(requestRef.current as number);
    }, [isRunning]);

    return <div className="grid-board">{gridSquares}</div>;
}
