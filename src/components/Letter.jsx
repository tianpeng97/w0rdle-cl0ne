import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { AppContext } from '../App';

function Letter({ letterPos, attemptVal }) {
  const {
    board,
    correctWord,
    currentAttempt,
    setDisabledLetters,
    setAlmostLetters,
    setCorrectLetters,
  } = useContext(AppContext);
  const letter = board[attemptVal][letterPos];

  const correct = correctWord.toUpperCase()[letterPos] === letter;
  const almost =
    !correct && letter !== '' && correctWord.toUpperCase().includes(letter);

  let letterState;
  if (currentAttempt.attempt > attemptVal) {
    if (correct) {
      letterState = 'correct';
    } else if (almost) {
      letterState = 'almost';
    } else {
      letterState = 'error';
    }
  }

  useEffect(() => {
    if (letter !== '' && !correct && !almost) {
      setDisabledLetters((prev) => [...prev, letter]);
    } else if (letter !== '' && correct) {
      setCorrectLetters((prev) => [...prev, letter]);
    } else if (letter !== '' && almost) {
      setAlmostLetters((prev) => [...prev, letter]);
    }
  }, [currentAttempt.attempt]);

  return (
    <div className="letter" id={letterState}>
      {letter}
    </div>
  );
}
Letter.propTypes = {
  letterPos: PropTypes.number.isRequired,
  attemptVal: PropTypes.number.isRequired,
};

export default Letter;
