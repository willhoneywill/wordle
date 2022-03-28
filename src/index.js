import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import words from './data/words'

function App() {
    return <Game />;
}

function Game() {
    return (
        <div className="game">
            <div className="game-header">
                <h2>Wordle{/* status */}</h2>
            </div>
            <Board />
        </div>
    );
}

function Board () {
    const [letters, setLetters] = useState(Array(25).fill(null));
    const [tileClasses, setTileClasses] = useState(Array(25).fill(''));
    const [currentRow, setCurrentRow] = useState(Array(5).fill(null));
    const [activeTile, setActiveTile] = useState(0);
    const [lastTile, setLastTile] = useState(0);
    const [rowStart, setRowStart] = useState(0);
    const [rowEnd, setRowEnd] = useState(5);
    const [showModal, setShowModal] = useState(null);
    const [modalMessage, setModalMessage] = useState('');
    const [wordList, setWordList] = useState(words);
    const [answer, setAnswer] = useState('jakey');
    const [gameActive, setGameActive] = useState(true);

    const renderTile = (i) => {
        return (
            <Tile
                value={letters[i]}
                class={tileClasses[i]}
            />
        )
    }

    const renderLetter = (letter) => {
        return (
            <Letter
                value={letter}
                class={''}
                onClick={() => handleClick(letter)}
            />
        )
    }

    const renderDelete = (letter) => {
        return (
            <Letter
                value={letter}
                class={'big'}
                onClick={() => deleteLetter(letter)}
            />
        )
    }

    const renderEnter = (letter) => {
        return (
            <EnterKey
                value={letter}
                class={'big'}
                onClick={() => checkWord(letter)}
            />
        )
    }

    const handleClick = (letter) => {
        if(!gameActive) {
            return false;
        }
        console.log(rowStart, 'rowStart');
        if (activeTile % 5 === 0) {
            console.log(rowEnd, 'rowEnd!');
            if(activeTile === rowEnd) {
                return;
            }
        }
        tileClasses[activeTile] = 'active';
        letters[activeTile] = letter;

        const nextTile = activeTile + 1;
        const previousTile = activeTile;

        setLetters(letters);
        setActiveTile(nextTile);
        setLastTile(previousTile);
    }

    const deleteLetter = (letter) => {
        if(!gameActive) {
            return false;
        }

        if (rowStart === activeTile) {
            return false;
        }
        letters[lastTile] = '';
        
        let previousTile = lastTile - 1;
        let nextTile = activeTile - 1;

        if (previousTile < 0) {
            previousTile = 0;
        }
        if (nextTile < 0) {
            nextTile = 0;
        }

        let oldTileClasses = [...tileClasses];
        oldTileClasses[nextTile] = '';

        setTileClasses(oldTileClasses);
        setLetters(letters);
        setActiveTile(nextTile);
        setLastTile(previousTile);
    }

    const checkWord = () => {
        if(!gameActive) {
            return false;
        }

        let word = getCurrentWord();
        if (word.length < 5) {
            setModalMessage('Not enough letters');
            setShowModal(true);
            const closeModal = setTimeout(function(){setShowModal(null)},1000)
            return false;
        }
        if (!words[word]) {
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

        for (let i = rowStart; i < rowEnd; i++) {
            if(letters[i]) {
                word = word + letters[i];
            }
            console.log(i, 'counter');
        }
        console.log(word);

        return word.toLowerCase();
    }

    const updateTiles = (word) => {
        let oldTileClasses = [...tileClasses];

        const wordLetters = word.split('');
        const answerLetters = answer.split('');

        let i = 0;
        let tileIndex = activeTile - 5;
        let correctTiles = 0

        currentRow.forEach(function callback(value, index) {
            oldTileClasses[tileIndex] = 'grey';
            if(answerLetters.includes(wordLetters[i])) {
                oldTileClasses[tileIndex] = 'orange';
            }
            if(wordLetters[i] === answerLetters[i]){
                oldTileClasses[tileIndex] = 'green';
                correctTiles = correctTiles + 1;
            }
            i = i + 1;
            tileIndex = tileIndex + 1;
        });
        setTileClasses(oldTileClasses);

        //check if word is solved
        if(correctTiles === 5) {
            setModalMessage('Winner!');
            setShowModal(true);
            setGameActive(false);
        }

        //close off previous row
        let rowCount = rowStart + 5;
        setRowStart(rowCount);

        let rowCountEnd = rowEnd + 5;
        setRowEnd(rowCountEnd);

    }

    const updateKeyboad = (word) => {
        let oldTileClasses = [...tileClasses];

        const wordLetters = word.split('');
        const answerLetters = answer.split('');

        let i = 0;
        let tileIndex = activeTile - 5;
        let correctTiles = 0

        currentRow.forEach(function callback(value, index) {
            oldTileClasses[tileIndex] = 'grey';
            if(answerLetters.includes(wordLetters[i])) {
                oldTileClasses[tileIndex] = 'orange';
            }
            if(wordLetters[i] === answerLetters[i]){
                oldTileClasses[tileIndex] = 'green';
                correctTiles = correctTiles + 1;
            }
            i = i + 1;
            tileIndex = tileIndex + 1;
        });
        setTileClasses(oldTileClasses);

        //check if word is solved
        if(correctTiles === 5) {
            setModalMessage('Winner!');
            setShowModal(true);
            setGameActive(false);
        }

        //close off previous row
        let rowCount = rowStart + 5;
        setRowStart(rowCount);

        let rowCountEnd = rowEnd + 5;
        setRowEnd(rowCountEnd);

    }


    useEffect(() => {
        console.log({ activeTile }, 'Active tile');
    });


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
                    {renderDelete('DELETE')}
                </div>
            </div>
            <Modal message={modalMessage} showModal={showModal} />
        </div>

    )
}

function Letter(props) {
    return (
        <button className={"keyboard-row_letter " + props.class} onClick={props.onClick}>
            {props.value}
        </button>
    );
}

function EnterKey(props) {
    return (
        <button className={"keyboard-row_letter " + props.class} onClick={props.onClick}>
            <svg width="24px" height="24px" color="#fff" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M19,6a1,1,0,0,0-1,1v4a1,1,0,0,1-1,1H7.41l1.3-1.29A1,1,0,0,0,7.29,9.29l-3,3a1,1,0,0,0-.21.33,1,1,0,0,0,0,.76,1,1,0,0,0,.21.33l3,3a1,1,0,0,0,1.42,0,1,1,0,0,0,0-1.42L7.41,14H17a3,3,0,0,0,3-3V7A1,1,0,0,0,19,6Z"/>
            </svg>
        </button>
    );
}

function Tile(props) {
    return (
        <button className={'tiles-word_letter ' + props.class}>
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
