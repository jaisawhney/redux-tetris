import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { pause, resume, restart } from '../features/gameSlice';
import { RootState } from '../app/store';

export default function ScoreBoard() {
    const dispatch = useDispatch();
    const { score, isRunning } = useSelector(
        (state: RootState) => state.game
    );

    return (
        <div className="score-board">
            <div>Score: {score}</div>
            <div>Level: 1</div>
            <button
                className="score-board-button"
                onClick={() => {
                    if (isRunning) {
                        dispatch(pause());
                    } else {
                        dispatch(resume());
                    }
                }}>
                {isRunning ? 'Pause' : 'Play'}
            </button>
            <button
                className="score-board-button"
                onClick={() => dispatch(restart())}>
                Restart
            </button>
        </div>
    );
}
