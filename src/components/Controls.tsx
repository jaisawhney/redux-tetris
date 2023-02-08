import React, { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../app/store';
import { moveDown, moveLeft, moveRight, rotate } from '../reducers/gameSlice';

export default function Controls() {
    const dispatch = useDispatch();
    const { isRunning, speed } = useSelector(
        (state: RootState) => state.game
    );

    const requestRef = useRef<DOMHighResTimeStamp>();
    const lastUpdateTimeRef = useRef<DOMHighResTimeStamp>(0);
    const progressTimeRef = useRef<DOMHighResTimeStamp>(0);

    const update = (time: number) => {
        requestRef.current = requestAnimationFrame(update);
        if (!isRunning) {
            return;
        }
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
