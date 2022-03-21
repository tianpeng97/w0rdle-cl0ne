import React from 'react';
import { useAppContext } from '../Context';

function Key({ keyVal, bigKey }) {
  const { onSelectLetter, onDelete, onEnter } = useAppContext;
  const selectLetter = () => {
    if (keyVal === 'ENTER') {
      onEnter();
    } else if (keyVal === 'DELETE') {
      onDelete();
    } else {
      onSelectLetter(keyVal);
    }
  };

  return (
    <div className="key" id={bigKey && 'big'} onClick={selectLetter}>
      {keyVal}
    </div>
  );
}

export default Key;
