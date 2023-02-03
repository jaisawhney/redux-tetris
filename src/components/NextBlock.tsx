import React from 'react';
import GridSquare from './GridSquare';

export default function NextBlock() {
    const block = [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
    ];
    const grid = block.map((rowArray, row) => {
        return rowArray.map((square, col) => {
            return (
                <GridSquare key={`${row}${col}`} color={square.toString()} />
            );
        });
    });

    return <div className="next-block">{grid}</div>;
}
