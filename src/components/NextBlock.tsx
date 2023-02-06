import React from "react";
import GridSquare from "./GridSquare";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";
import { shapes } from "../utils";

export default function NextBlock() {
    const nextShape = useSelector((state: RootState) => state.game.nextShape);

    const block = shapes[nextShape][0];
    const grid = block.map((rowArray, row) => {
        return rowArray.map((square, col) => {
            return (
                <GridSquare key={`${row}${col}`} color={square ? nextShape.toString() : "0"} />
            );
        });
    });

    return <div className="next-block">{grid}</div>;
}
