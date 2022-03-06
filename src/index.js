import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './App.css';

function App() {
    return <Game />;
}

function Game() {
    return (
        <div className="game">
            <div className="game-header">
                <h2>Wordle{/* status */}</h2>
            </div>
            <div className="game-board">
                <Board />
            </div>
        </div>
    );
}

function Board () {
    const [letters, setLetters] = useState(Array(25).fill(null));
    const [titleClass, setTileClass] = useState('grey');
    const [currentRow, setCurrentRow] = useState(Array(5).fill(null));
    const [activeTile, setActiveTile] = useState(0);
    const [lastTile, setLastTile] = useState(0);
    const [showModal, setShowModal] = useState(null);
    const [modalMessage, setModalMessage] = useState('');
    const [wordList, setWordList] = useState(['willy', 'secil', 'jakey']);

    const renderTile = (i) => {
        return (
            <Tile
                value={letters[i]}
                class={tileClass}
            />
        )
    }

    const renderLetter = (letter) => {
        return (
            <Letter
                value={letter}
                onClick={() => handleClick(letter)}
            />
        )
    }

    const renderDelete = (letter) => {
        return (
            <Letter
                value={letter}
                onClick={() => deleteLetter(letter)}
            />
        )
    }

    const renderEnter = (letter) => {
        return (
            <Letter
                value={letter}
                onClick={() => checkWord(letter)}
            />
        )
    }

    const handleClick = (letter) => {
        if (activeTile % 5 == 0) {
            if(activeTile != 0) {
                return;
            }
        }

        letters[activeTile] = letter;

        const nextTile = activeTile + 1;
        const previousTile = activeTile

        console.log(nextTile, 'Next tile');
        console.log(lastTile, 'last tile');

        setLetters(letters);
        setActiveTile(nextTile);
        setLastTile(previousTile);
    }

    const deleteLetter = (letter) => {
        letters[lastTile] = '';
        
        let previousTile = lastTile - 1;
        let nextTile = activeTile - 1;

        if (previousTile < 0) {
            previousTile = 0;
        }
        if (nextTile < 0) {
            nextTile = 0;
        }

        setLetters(letters);
        setActiveTile(nextTile);
        setLastTile(previousTile);
    }

    const checkWord = () => {
        let word = getCurrentWord();
        if (word.length < 5) {
            setModalMessage('Not enough letters');
            setShowModal(true);
            const closeModal = setTimeout(function(){setShowModal(null)},1000)
            return false;
        }
        if (!isInWordList(word)) {
            setModalMessage('Word not in list');
            setShowModal(true);
            const closeModal = setTimeout(function(){setShowModal(null)},1000)
            return false;
        }
        updateTiles(word);
        console.log(word);
    }

    const isInWordList = (word) => {
        if (wordList.includes(word)) {
            return true;
        }
        return false;
    }

    const getCurrentWord = () => {
        let word = '';
        currentRow.forEach(function callback(value, index) {
            if(letters[index]) {
                word = word + letters[index];
            }
        });
        return word.toLowerCase();
    }

    const updateTiles = (word) => {

    }

    return (
        <div className="board">
            <div className="tiles">
                <div className="tiles-word">
                    {renderTile(0)}
                    {renderTile(1)}
                    {renderTile(2)}
                    {renderTile(3)}
                    {renderTile(4)}
                </div>
                <div className="tiles-word">
                    {renderTile(5)}
                    {renderTile(6)}
                    {renderTile(7)}
                    {renderTile(8)}
                    {renderTile(9)}
                </div>
                <div className="tiles-word">
                    {renderTile(10)}
                    {renderTile(11)}
                    {renderTile(12)}
                    {renderTile(13)}
                    {renderTile(14)}
                </div>
                <div className="tiles-word">
                    {renderTile(15)}
                    {renderTile(16)}
                    {renderTile(17)}
                    {renderTile(18)}
                    {renderTile(19)}
                </div>
                <div className="tiles-word">
                    {renderTile(20)}
                    {renderTile(21)}
                    {renderTile(22)}
                    {renderTile(23)}
                    {renderTile(24)}
                </div>
            </div>
            <div className="keyboard">
                <div className="keyboard-row">
                    {renderLetter('Q')}
                    {renderLetter('W')}
                    {renderLetter('E')}
                    {renderLetter('R')}
                    {renderLetter('T')}
                    {renderLetter('Y')}
                    {renderLetter('U')}
                    {renderLetter('I')}
                    {renderLetter('O')}
                    {renderLetter('P')}
                </div>
                <div className="keyboard-row">
                    {renderLetter('A')}
                    {renderLetter('S')}
                    {renderLetter('D')}
                    {renderLetter('F')}
                    {renderLetter('G')}
                    {renderLetter('H')}
                    {renderLetter('J')}
                    {renderLetter('K')}
                    {renderLetter('L')}
                </div>
                <div className="keyboard-row">
                    {renderEnter('ENTER')}
                    {renderLetter('Z')}
                    {renderLetter('X')}
                    {renderLetter('C')}
                    {renderLetter('V')}
                    {renderLetter('B')}
                    {renderLetter('N')}
                    {renderLetter('M')}
                    {renderDelete('XXX')}
                </div>
            </div>
            <Modal message={modalMessage} showModal={showModal} />
        </div>

    )
}

function Letter(props) {
    return (
        <button className="keyboard-row_letter" onClick={props.onClick}>
            {props.value}
        </button>
    );
}

function Tile(props) {
    return (
        <button className="tiles-word_letter {props.class}">
            {props.value}
        </button>
    );
}

function Modal(props) {
    if(!props.showModal) {
        return null;
    }
    return (
        <button className="modal">
            {props.message}
        </button>
    );
}

// ========================================

ReactDOM.render(
    <App />,
    document.getElementById('app')
);
