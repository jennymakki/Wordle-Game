import React from 'react';
import '../styles/Keyboard.css';

const Keyboard = ({ letterStatuses }) => {
  const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');

  return (
    <div className="keyboard">
      <div className="keyboard-row">
        {alphabet.slice(0, 10).map((letter) => (
          <button
            key={letter}
            className={`keyboard-key ${letterStatuses[letter] || ''}`}
          >
            {letter.toUpperCase()}
          </button>
        ))}
      </div>
      <div className="keyboard-row">
        {alphabet.slice(10, 19).map((letter) => (
          <button
            key={letter}
            className={`keyboard-key ${letterStatuses[letter] || ''}`}
          >
            {letter.toUpperCase()}
          </button>
        ))}
      </div>
      <div className="keyboard-row">
        {alphabet.slice(19, 26).map((letter) => (
          <button
            key={letter}
            className={`keyboard-key ${letterStatuses[letter] || ''}`}
          >
            {letter.toUpperCase()}
          </button>
        ))}
      </div>

    </div>
  );
};

export default Keyboard;