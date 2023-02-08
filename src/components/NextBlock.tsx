import React from "react";
import GridSquare from "./GridSquare";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";
import { SHAPES } from "../constants/gameDefaults";

export default function NextBlock() {
    const nextShape = useSelector((state: RootState) => state.game.nextShape);

    const block = SHAPES[nextShape][0];
    const grid = block.map((rowArray, row) => {
        return rowArray.map((square, col) => {
            return (
                <GridSquare key={`${row}${col}`} color={square ? nextShape.toString() : "0"} />
            );
        });
    });

    return <div className="next-block">{grid}</div>;
}
