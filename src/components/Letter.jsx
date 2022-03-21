import React from 'react';
import PropTypes from 'prop-types';
import { useAppContext } from '../Context';

function Letter({ letterPos, attemptVal }) {
  const { board, correctWord, currentAttempt } = useAppContext;
  const letter = board[attemptVal][letterPos];

  const correct = correctWord[letterPos] === letter;
  const almost = !correct && letter !== '' && correctWord.includes(letter);

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
