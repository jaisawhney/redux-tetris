import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../app/store';

export default function MessagePopup() {
    const { isRunning, gameOver } = useSelector(
        (state: RootState) => state.game
    );

    let gameStatus = '';
    let isHidden = true;
    if (gameOver) {
        isHidden = false;
        gameStatus = 'Game Over';
    } else if (!isRunning) {
        isHidden = false;
        gameStatus = 'Paused';
    }

    return (
        <div className={'message-popup' + (isHidden ? ' hidden' : '')}>
            <h1>{gameStatus}</h1>
        </div>
    );
}
