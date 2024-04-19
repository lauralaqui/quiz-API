import React from 'react';
import Blobbackground from './Blobbackground';

export default function Start(props) {
    return (
        <>
            <Blobbackground />
            <div className="startContainer" role="region" aria-label="Start Game">
                <h1>Quizzical</h1>
                <p>a multiple choice trivia game</p>
                <button
                    className="startButton"
                    onClick={props.startGame}
                    aria-label="Start Game"
                >
                    Start Game
                </button>
            </div>
        </>
    );
}
