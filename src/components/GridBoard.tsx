import GridSquare from './GridSquare'
import {ReactElement} from "react";

export default function GridBoard() {

    const grid: Array<ReactElement[]> = [];
    for (let row = 0; row < 18; row++) {
        grid.push([]);
        for (let col = 0; col < 10; col++) {
            grid[row].push(<GridSquare key={`${col}${row}`} color='0'/>);
        }
    }

    return (
        <div className='grid-board'>
            {grid}
        </div>
    )
}