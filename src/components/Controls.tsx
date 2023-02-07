import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../app/store';
import { moveDown, moveLeft, moveRight, rotate } from '../features/gameSlice';

export default function Controls() {
    const isRunning = useSelector((state: RootState) => state.game.isRunning);
    const dispatch = useDispatch();

    return (
        <div className="controls">
            {/* left */}
            <button
                disabled={!isRunning}
                className="control-button"
                onClick={() => dispatch(moveLeft())}>
                Left
            </button>

            {/* right */}
            <button
                disabled={!isRunning}
                className="control-button"
                onClick={() => dispatch(moveRight())}>
                Right
            </button>

            {/* rotate */}
            <button
                disabled={!isRunning}
                className="control-button"
                onClick={() => dispatch(rotate())}>
                Rotate
            </button>

            {/* down */}
            <button
                disabled={!isRunning}
                className="control-button"
                onClick={() => dispatch(moveDown())}>
                Down
            </button>
        </div>
    );
}
