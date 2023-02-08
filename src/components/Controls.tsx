import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../app/store';
import { drop, moveDown, moveX, rotate } from '../reducers/gameSlice';

export default function Controls() {
    const dispatch = useDispatch();
    const { isRunning } = useSelector((state: RootState) => state.game);

    const keyDown = (e: KeyboardEvent) => {
        if (!isRunning) return;

        switch (e.code) {
            case 'KeyA':
            case 'ArrowLeft':
                dispatch(moveX(-1));
                break;
            case 'KeyD':
            case 'ArrowRight':
                dispatch(moveX(1));
                break;
            case 'KeyW':
            case 'ArrowUp':
                dispatch(rotate());
                break;
            case 'KeyS':
            case 'ArrowDown':
                dispatch(moveDown());
                break;
            case 'Space':
                dispatch(drop());
                break;
        }
    };

    useEffect(() => {
        window.addEventListener('keydown', keyDown);
    }, []);

    return (
        <div className="controls">
            {/* left */}
            <button
                disabled={!isRunning}
                className="control-button"
                onClick={() => dispatch(moveX(-1))}>
                Left
            </button>

            {/* right */}
            <button
                disabled={!isRunning}
                className="control-button"
                onClick={() => dispatch(moveX(+1))}>
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
