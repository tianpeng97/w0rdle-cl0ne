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
  const almost = !correct && correctWord.toUpperCase().includes(letter);

  let letterState;
  if (currentAttempt.attempt > attemptVal && letter !== '') {
    if (correct) {
      letterState = 'correct';
    } else if (almost) {
      letterState = 'almost';
    } else {
      letterState = 'error';
    }
  }

  useEffect(() => {
    if (letter !== '') {
      if (correct) {
        setCorrectLetters((prev) => new Set(prev).add(letter));
      } else if (almost) {
        setAlmostLetters((prev) => new Set(prev).add(letter));
      } else {
        setDisabledLetters((prev) => new Set(prev).add(letter));
      }
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
