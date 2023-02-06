import GridSquare from './GridSquare';
import { useSelector } from 'react-redux';
import { RootState } from '../app/store';
import { shapes } from '../utils';

export default function GridBoard() {
    const { grid, shape, rotation, x, y } = useSelector(
        (state: RootState) => state.game
    );

    const block = shapes[shape][rotation];
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
    return <div className="grid-board">{gridSquares}</div>;
}
