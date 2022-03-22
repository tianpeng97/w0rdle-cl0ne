import './App.css';
import React, { createContext, useState, useEffect } from 'react';
import Board from './components/Board';
import Keyboard from './components/Keyboard';
import GameOver from './components/GameOver';
import { boardDefault, generateWord } from './components/Words';

export const AppContext = createContext();

function App() {
  const [board, setBoard] = useState(boardDefault);
  const [currentAttempt, setCurrentAttempt] = useState({
    attempt: 0,
    letterPos: 0,
  });
  const [wordsSet, setWordsSet] = useState(new Set());
  const [disabledLetters, setDisabledLetters] = useState([]);
  const [almostLetters, setAlmostLetters] = useState([]);
  const [correctLetters, setCorrectLetters] = useState([]);
  const [correctWord, setCorrectWord] = useState('');
  const [gameOver, setGameOver] = useState({
    gameOver: false,
    guessedWord: false,
  });

  useEffect(() => {
    generateWord().then((words) => {
      setWordsSet(words.wordsSet);
      setCorrectWord(words.randomWord);
    });
  }, []);

  const onSelectLetter = (keyVal) => {
    if (currentAttempt.letterPos > 4) return;
    const newBoard = [...board];
    newBoard[currentAttempt.attempt][currentAttempt.letterPos] = keyVal;
    setBoard(newBoard);
    setCurrentAttempt({
      ...currentAttempt,
      letterPos: currentAttempt.letterPos + 1,
    });
  };

  const onDelete = () => {
    if (currentAttempt.letterPos === 0) return;
    const newBoard = [...board];
    newBoard[currentAttempt.attempt][currentAttempt.letterPos - 1] = '';
    setBoard(newBoard);
    setCurrentAttempt({
      ...currentAttempt,
      letterPos: currentAttempt.letterPos - 1,
    });
  };

  const onEnter = () => {
    if (currentAttempt.letterPos !== 5) return;

    let currentWord = '';
    for (let pos = 0; pos < 5; pos += 1) {
      currentWord += board[currentAttempt.attempt][pos];
    }

    if (wordsSet.has(currentWord.toLowerCase())) {
      setCurrentAttempt({ attempt: currentAttempt.attempt + 1, letterPos: 0 });
    } else {
      alert('Not a word.');
    }

    if (currentWord.toLowerCase() === correctWord) {
      setGameOver({ gameOver: true, guessedWord: true });
      return;
    }

    if (currentAttempt.attempt === 5) {
      setGameOver({ gameOver: true, guessedWord: false });
      return;
    }
  };

  return (
    <div className="App">
      <nav>
        <h1>Wordle</h1>
      </nav>
      <div className="game">
        <AppContext.Provider
          value={{
            board,
            setBoard,
            currentAttempt,
            setCurrentAttempt,
            onSelectLetter,
            onDelete,
            onEnter,
            correctWord,
            disabledLetters,
            setDisabledLetters,
            gameOver,
            setGameOver,
            almostLetters,
            setAlmostLetters,
            correctLetters,
            setCorrectLetters,
          }}
        >
          <Board />
          {gameOver.gameOver ? <GameOver /> : <Keyboard />}
        </AppContext.Provider>
      </div>
    </div>
  );
}

export default App;
