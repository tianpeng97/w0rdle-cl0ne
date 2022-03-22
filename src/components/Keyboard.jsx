import React, { useCallback, useEffect, useContext } from 'react';
import { AppContext } from '../App';
import Key from './Key';

function Keyboard() {
  const {
    onEnter,
    onDelete,
    onSelectLetter,
    disabledLetters,
    correctLetters,
    almostLetters,
  } = useContext(AppContext);
  const keys1 = ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'];
  const keys2 = ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'];
  const keys3 = ['Z', 'X', 'C', 'V', 'B', 'N', 'M'];

  const handleKeyboard = useCallback((event) => {
    if (event.key === 'Enter') {
      onEnter();
    } else if (event.key === 'Backspace') {
      onDelete();
    } else {
      keys3.forEach((key) => {
        if (event.key.toLowerCase() === key.toLowerCase()) {
          onSelectLetter(key);
        }
      });
      keys2.forEach((key) => {
        if (event.key.toLowerCase() === key.toLowerCase()) {
          onSelectLetter(key);
        }
      });
      keys1.forEach((key) => {
        if (event.key.toLowerCase() === key.toLowerCase()) {
          onSelectLetter(key);
        }
      });
    }
  });

  useEffect(() => {
    document.addEventListener('keydown', handleKeyboard);

    return () => {
      document.removeEventListener('keydown', handleKeyboard);
    };
  }, [handleKeyboard]);

  const stateCheck = (key) => {
    if (correctLetters.includes(key)) {
      return 'correct';
    } else if (almostLetters.includes(key)) {
      return 'almost';
    } else if (disabledLetters.includes(key)) {
      return 'disabled';
    } else {
      return undefined;
    }
  };

  return (
    <div className="keyboard" onKeyDown={handleKeyboard}>
      <div className="line1">
        {keys1.map((key) => (
          <Key keyVal={key} state={stateCheck(key)} />
        ))}
      </div>
      <div className="line2">
        {keys2.map((key) => (
          <Key keyVal={key} state={stateCheck(key)} />
        ))}
      </div>
      <div className="line3">
        <Key keyVal="ENTER" bigKey />
        {keys3.map((key) => (
          <Key keyVal={key} state={stateCheck(key)} />
        ))}
        <Key keyVal="DELETE" bigKey />
      </div>
    </div>
  );
}

export default Keyboard;
